const { pool } = require('../config/database');

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
            INSERT INTO appointments (
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
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
            WHERE 1=1
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

        query += ' ORDER BY a.appointment_date DESC, a.appointment_time DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [appointments] = await pool.query(query, params);

        res.status(200).json({
            success: true,
            count: appointments.length,
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

        res.status(200).json({
            success: true,
            message: 'Appointment status updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Delete appointment (Admin)
const deleteAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query('DELETE FROM appointments WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment deleted successfully'
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
    deleteAppointment
};
