const { pool } = require('../config/database');

// Get all working hours for all doctors
const getAllWorkingHours = async (req, res, next) => {
    try {
        const [workingHours] = await pool.query(`
            SELECT 
                wh.id,
                wh.doctor_id,
                d.name as doctor_name,
                wh.day_of_week,
                wh.start_time,
                wh.end_time,
                wh.is_available
            FROM working_hours wh
            INNER JOIN doctors d ON wh.doctor_id = d.id
            WHERE d.is_active = TRUE
            ORDER BY wh.doctor_id, 
                FIELD(wh.day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
        `);

        res.status(200).json({
            success: true,
            count: workingHours.length,
            data: workingHours
        });
    } catch (error) {
        next(error);
    }
};

// Get working hours for a specific doctor
const getDoctorWorkingHours = async (req, res, next) => {
    try {
        const { doctorId } = req.params;

        const [workingHours] = await pool.query(`
            SELECT 
                wh.id,
                wh.doctor_id,
                d.name as doctor_name,
                wh.day_of_week,
                wh.start_time,
                wh.end_time,
                wh.is_available
            FROM working_hours wh
            INNER JOIN doctors d ON wh.doctor_id = d.id
            WHERE wh.doctor_id = ? AND d.is_active = TRUE
            ORDER BY FIELD(wh.day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
        `, [doctorId]);

        res.status(200).json({
            success: true,
            count: workingHours.length,
            data: workingHours
        });
    } catch (error) {
        next(error);
    }
};

// Create or update working hours for a doctor (bulk operation)
const upsertWorkingHours = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const { workingHours } = req.body;

        if (!Array.isArray(workingHours) || workingHours.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Working hours array is required'
            });
        }

        // Verify doctor exists
        const [doctors] = await pool.query('SELECT id FROM doctors WHERE id = ? AND is_active = TRUE', [doctorId]);
        if (doctors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Validate each working hour entry
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        for (const wh of workingHours) {
            if (!validDays.includes(wh.day_of_week)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid day_of_week: ${wh.day_of_week}`
                });
            }

            if (!wh.start_time || !wh.end_time) {
                return res.status(400).json({
                    success: false,
                    message: 'start_time and end_time are required for each entry'
                });
            }

            // Validate time format (HH:MM:SS or HH:MM)
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
            if (!timeRegex.test(wh.start_time) || !timeRegex.test(wh.end_time)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid time format. Use HH:MM or HH:MM:SS'
                });
            }
        }

        // Delete existing working hours for this doctor
        await pool.query('DELETE FROM working_hours WHERE doctor_id = ?', [doctorId]);

        // Insert new working hours
        if (workingHours.length > 0) {
            const values = workingHours.map(wh => [
                doctorId,
                wh.day_of_week,
                wh.start_time,
                wh.end_time,
                wh.is_available !== undefined ? wh.is_available : true
            ]);

            await pool.query(`
                INSERT INTO working_hours (doctor_id, day_of_week, start_time, end_time, is_available)
                VALUES ?
            `, [values]);
        }

        res.status(200).json({
            success: true,
            message: 'Working hours updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Create single working hour entry
const createWorkingHour = async (req, res, next) => {
    try {
        const { doctor_id, day_of_week, start_time, end_time, is_available } = req.body;

        if (!doctor_id || !day_of_week || !start_time || !end_time) {
            return res.status(400).json({
                success: false,
                message: 'doctor_id, day_of_week, start_time, and end_time are required'
            });
        }

        // Verify doctor exists
        const [doctors] = await pool.query('SELECT id FROM doctors WHERE id = ? AND is_active = TRUE', [doctor_id]);
        if (doctors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        const [result] = await pool.query(`
            INSERT INTO working_hours (doctor_id, day_of_week, start_time, end_time, is_available)
            VALUES (?, ?, ?, ?, ?)
        `, [doctor_id, day_of_week, start_time, end_time, is_available !== undefined ? is_available : true]);

        res.status(201).json({
            success: true,
            message: 'Working hour created successfully',
            data: { id: result.insertId }
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: 'Working hours already exist for this doctor and day'
            });
        }
        next(error);
    }
};

// Update single working hour entry
const updateWorkingHour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { day_of_week, start_time, end_time, is_available } = req.body;

        // Check if working hour exists
        const [existing] = await pool.query('SELECT id FROM working_hours WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Working hour not found'
            });
        }

        await pool.query(`
            UPDATE working_hours
            SET day_of_week = ?, start_time = ?, end_time = ?, is_available = ?
            WHERE id = ?
        `, [day_of_week, start_time, end_time, is_available, id]);

        res.status(200).json({
            success: true,
            message: 'Working hour updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Delete working hour entry
const deleteWorkingHour = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query('DELETE FROM working_hours WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Working hour not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Working hour deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllWorkingHours,
    getDoctorWorkingHours,
    upsertWorkingHours,
    createWorkingHour,
    updateWorkingHour,
    deleteWorkingHour
};
