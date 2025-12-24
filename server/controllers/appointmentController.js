const { pool } = require('../config/database');
const {
    sendAppointmentBookingEmail,
    sendAppointmentManagerNotification,
    sendAppointmentStatusUpdateEmail,
    sendManagerStatusUpdateNotification,
    sendAppointmentRescheduleEmail,
    sendManagerRescheduleNotification
} = require('../utils/emailService');

// Helper function to generate time slots
const generateTimeSlots = (startTime, endTime, interval = 30) => {
    const slots = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute < endMinute)
    ) {
        const timeString = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}:00`;
        slots.push(timeString);

        currentMinute += interval;
        if (currentMinute >= 60) {
            currentHour += Math.floor(currentMinute / 60);
            currentMinute = currentMinute % 60;
        }
    }

    return slots;
};

// Get day name from date
const getDayName = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
};

// Get available time slots for a doctor on a specific date
const getAvailableSlots = async (req, res, next) => {
    try {
        const { doctorId, date } = req.query;

        if (!doctorId || !date) {
            return res.status(400).json({
                success: false,
                message: 'Doctor ID and date are required'
            });
        }

        // Get day of week from date
        const dayOfWeek = getDayName(date);

        // Get doctor's working hours for this day
        const [hours] = await pool.query(`
            SELECT start_time, end_time, is_available
            FROM working_hours
            WHERE doctor_id = ? AND day_of_week = ? AND is_available = TRUE
    `, [doctorId, dayOfWeek]);

        if (hours.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Doctor is not available on this day',
                data: []
            });
        }

        const workingHours = hours[0];

        // Generate all possible time slots (1 hour intervals)
        const allSlots = generateTimeSlots(workingHours.start_time, workingHours.end_time, 60);

        // Get booked slots
        const [appointments] = await pool.query(`
            SELECT appointment_time
            FROM appointments
            WHERE doctor_id = ?
    AND appointment_date = ?
        AND status != 'cancelled'
            ORDER BY appointment_time
    `, [doctorId, date]);

        const bookedSlots = appointments.map(apt => apt.appointment_time);
        const bookedSlotsSet = new Set(bookedSlots);

        // Filter out booked slots
        const availableSlots = allSlots.filter(slot => !bookedSlotsSet.has(slot));

        res.status(200).json({
            success: true,
            data: {
                date,
                dayOfWeek,
                workingHours: {
                    start: workingHours.start_time,
                    end: workingHours.end_time
                },
                availableSlots,
                bookedSlots: Array.from(bookedSlotsSet)
            }
        });
    } catch (error) {
        next(error);
    }
};

// Book an appointment
const bookAppointment = async (req, res, next) => {
    try {
        const {
            doctorId,
            serviceId,
            patientName,
            patientEmail,
            patientPhone,
            patientAge,
            patientGender,
            appointmentDate,
            appointmentTime,
            notes
        } = req.body;

        // Validate required fields
        if (!doctorId || !serviceId || !patientName || !patientEmail || !patientPhone || !appointmentDate || !appointmentTime) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Check if slot is available
        const [existingAppointments] = await pool.query(`
            SELECT id
            FROM appointments
            WHERE doctor_id = ?
    AND appointment_date = ?
        AND appointment_time = ?
            AND status != 'cancelled'
                `, [doctorId, appointmentDate, appointmentTime]);

        if (existingAppointments.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'This time slot is already booked'
            });
        }

        // Create appointment
        const [result] = await pool.query(`
            INSERT INTO appointments(
                    doctor_id,
                    service_id,
                    patient_name,
                    patient_email,
                    patient_phone,
                    patient_age,
                    patient_gender,
                    appointment_date,
                    appointment_time,
                    notes,
                    status
                ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
                    `, [
            doctorId,
            serviceId,
            patientName,
            patientEmail,
            patientPhone,
            patientAge,
            patientGender,
            appointmentDate,
            appointmentTime,
            notes
        ]);

        // Fetch doctor and service details for email
        const [doctors] = await pool.query('SELECT name FROM doctors WHERE id = ?', [doctorId]);
        const [services] = await pool.query('SELECT service_name FROM services WHERE id = ?', [serviceId]);

        const doctorName = doctors.length > 0 ? doctors[0].name : 'Doctor';
        const serviceName = services.length > 0 ? services[0].service_name : 'Service';

        // Send email notifications (non-blocking)
        const appointmentDetails = {
            patientName,
            patientEmail,
            patientPhone,
            doctorName,
            serviceName,
            appointmentDate,
            appointmentTime,
            notes
        };

        // Send emails asynchronously without blocking the response
        Promise.all([
            sendAppointmentBookingEmail(patientEmail, appointmentDetails),
            sendAppointmentManagerNotification(appointmentDetails)
        ]).catch(error => {
            console.error('❌ Error sending appointment emails:', error);
            // Don't fail the booking if emails fail
        });

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            data: {
                id: result.insertId,
                doctorId,
                serviceId,
                patientName,
                patientEmail,
                patientPhone,
                patientAge,
                patientGender,
                appointmentDate,
                appointmentTime,
                notes,
                status: 'pending'
            }
        });
    } catch (error) {
        // Check for duplicate entry error (MySQL error code 1062)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'This time slot is already booked'
            });
        }
        next(error);
    }
};

// Get all appointments (Admin)
const getAllAppointments = async (req, res, next) => {
    try {
        const { status, date, limit = 50, offset = 0 } = req.query;

        let query = `
SELECT
a.id,
    a.doctor_id,
    a.service_id,
    a.patient_name,
    a.patient_email,
    a.patient_phone,
    a.patient_age,
    a.patient_gender,
    a.appointment_date,
    a.appointment_time,
    a.notes,
    a.status,
    a.created_at,
    d.name as doctor_name,
    s.service_name
            FROM appointments a
            LEFT JOIN doctors d ON a.doctor_id = d.id
            LEFT JOIN services s ON a.service_id = s.id
            WHERE 1 = 1
    `;

        const params = [];

        if (status) {
            query += ' AND a.status = ?';
            params.push(status);
        }

        if (date) {
            query += ' AND a.appointment_date = ?';
            params.push(date);
        }

        query += ' ORDER BY a.created_at DESC, a.appointment_date DESC, a.appointment_time DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [appointments] = await pool.query(query, params);

        // Get total count for pagination
        let countQuery = `SELECT COUNT(*) as total FROM appointments a WHERE 1 = 1`;
        const countParams = [];

        if (status) {
            countQuery += ' AND a.status = ?';
            countParams.push(status);
        }

        if (date) {
            countQuery += ' AND a.appointment_date = ?';
            countParams.push(date);
        }

        const [countResult] = await pool.query(countQuery, countParams);
        const total = countResult[0].total;

        res.status(200).json({
            success: true,
            count: appointments.length,
            total,
            data: appointments
        });
    } catch (error) {
        next(error);
    }
};

// Update appointment status (Admin)
const updateAppointmentStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be one of: pending, confirmed, completed, cancelled'
            });
        }

        // Fetch appointment details before update for email
        const [appointments] = await pool.query(`
SELECT
a.patient_name,
    a.patient_email,
    a.appointment_date,
    a.appointment_time,
    d.name as doctor_name,
    s.service_name
            FROM appointments a
            LEFT JOIN doctors d ON a.doctor_id = d.id
            LEFT JOIN services s ON a.service_id = s.id
            WHERE a.id = ?
    `, [id]);

        if (appointments.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        const appointment = appointments[0];

        const [result] = await pool.query(`
            UPDATE appointments
            SET status = ?
    WHERE id = ?
        `, [status, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Send email notifications (non-blocking)
        const appointmentDetails = {
            patientName: appointment.patient_name,
            patientEmail: appointment.patient_email,
            doctorName: appointment.doctor_name || 'Doctor',
            serviceName: appointment.service_name || 'Service',
            appointmentDate: appointment.appointment_date,
            appointmentTime: appointment.appointment_time
        };

        // Send emails asynchronously without blocking the response
        Promise.all([
            sendAppointmentStatusUpdateEmail(appointment.patient_email, appointmentDetails, status),
            sendManagerStatusUpdateNotification(appointmentDetails, status)
        ]).catch(error => {
            console.error('❌ Error sending status update emails:', error);
            // Don't fail the update if emails fail
        });

        res.status(200).json({
            success: true,
            message: 'Appointment status updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Reschedule appointment (Admin)
const rescheduleAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { appointmentDate, appointmentTime } = req.body;

        if (!appointmentDate || !appointmentTime) {
            return res.status(400).json({
                success: false,
                message: 'New appointment date and time are required'
            });
        }

        // Fetch current appointment details
        const [appointments] = await pool.query(`
            SELECT
a.*,
    d.name as doctor_name,
    s.service_name
            FROM appointments a
            LEFT JOIN doctors d ON a.doctor_id = d.id
            LEFT JOIN services s ON a.service_id = s.id
            WHERE a.id = ?
    `, [id]);

        if (appointments.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        const appointment = appointments[0];
        const oldDate = appointment.appointment_date;
        const oldTime = appointment.appointment_time;

        // Check if new slot is available (excluding current appointment)
        const [existingAppointments] = await pool.query(`
            SELECT id
            FROM appointments
            WHERE doctor_id = ?
    AND appointment_date = ?
        AND appointment_time = ?
            AND status != 'cancelled'
            AND id != ?
    `, [appointment.doctor_id, appointmentDate, appointmentTime, id]);

        if (existingAppointments.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'This time slot is already booked'
            });
        }

        // Update appointment
        const [result] = await pool.query(`
            UPDATE appointments
            SET appointment_date = ?, appointment_time = ?
    WHERE id = ?
        `, [appointmentDate, appointmentTime, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Failed to reschedule appointment'
            });
        }

        // Send email notifications (non-blocking)
        const appointmentDetails = {
            patientName: appointment.patient_name,
            patientEmail: appointment.patient_email,
            doctorName: appointment.doctor_name || 'Doctor',
            serviceName: appointment.service_name || 'Service',
            appointmentDate,
            appointmentTime
        };

        // Send emails asynchronously without blocking the response
        Promise.all([
            sendAppointmentRescheduleEmail(appointment.patient_email, appointmentDetails, oldDate, oldTime),
            sendManagerRescheduleNotification(appointmentDetails, oldDate, oldTime)
        ]).catch(error => {
            console.error('❌ Error sending reschedule emails:', error);
            // Don't fail the reschedule if emails fail
        });

        res.status(200).json({
            success: true,
            message: 'Appointment rescheduled successfully',
            data: {
                id,
                oldDate,
                oldTime,
                newDate: appointmentDate,
                newTime: appointmentTime
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAvailableSlots,
    bookAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    rescheduleAppointment
};
