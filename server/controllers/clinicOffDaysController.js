const { pool } = require('../config/database');

// Get all clinic off-days
const getAllOffDays = async (req, res, next) => {
    try {
        const [offDays] = await pool.query(`
            SELECT 
                id,
                off_date,
                reason,
                created_at
            FROM clinic_off_days
            ORDER BY off_date ASC
        `);

        res.status(200).json({
            success: true,
            count: offDays.length,
            data: offDays
        });
    } catch (error) {
        next(error);
    }
};

// Get upcoming off-days (from today onwards)
const getUpcomingOffDays = async (req, res, next) => {
    try {
        const [offDays] = await pool.query(`
            SELECT 
                id,
                DATE_FORMAT(off_date, '%Y-%m-%d') as off_date,
                reason,
                created_at
            FROM clinic_off_days
            WHERE off_date >= CURDATE()
            ORDER BY off_date ASC
        `);

        res.status(200).json({
            success: true,
            count: offDays.length,
            data: offDays
        });
    } catch (error) {
        next(error);
    }
};

// Get off-days for a specific date range
const getOffDaysByRange = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'startDate and endDate are required'
            });
        }

        const [offDays] = await pool.query(`
            SELECT 
                id,
                off_date,
                reason,
                created_at
            FROM clinic_off_days
            WHERE off_date BETWEEN ? AND ?
            ORDER BY off_date ASC
        `, [startDate, endDate]);

        res.status(200).json({
            success: true,
            count: offDays.length,
            data: offDays
        });
    } catch (error) {
        next(error);
    }
};

// Create a new off-day
const createOffDay = async (req, res, next) => {
    try {
        const { off_date, reason } = req.body;

        if (!off_date) {
            return res.status(400).json({
                success: false,
                message: 'off_date is required'
            });
        }

        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(off_date)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Use YYYY-MM-DD'
            });
        }

        // Check if date is in the past
        const offDate = new Date(off_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (offDate < today) {
            return res.status(400).json({
                success: false,
                message: 'Cannot create off-day for past dates'
            });
        }

        const [result] = await pool.query(`
            INSERT INTO clinic_off_days (off_date, reason)
            VALUES (?, ?)
        `, [off_date, reason || null]);

        res.status(201).json({
            success: true,
            message: 'Off-day created successfully',
            data: { id: result.insertId, off_date, reason }
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: 'This date is already marked as an off-day'
            });
        }
        next(error);
    }
};

// Update an off-day
const updateOffDay = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { off_date, reason } = req.body;

        if (!off_date) {
            return res.status(400).json({
                success: false,
                message: 'off_date is required'
            });
        }

        // Check if off-day exists
        const [existing] = await pool.query('SELECT id FROM clinic_off_days WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Off-day not found'
            });
        }

        await pool.query(`
            UPDATE clinic_off_days
            SET off_date = ?, reason = ?
            WHERE id = ?
        `, [off_date, reason || null, id]);

        res.status(200).json({
            success: true,
            message: 'Off-day updated successfully'
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: 'This date is already marked as an off-day'
            });
        }
        next(error);
    }
};

// Delete an off-day
const deleteOffDay = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query('DELETE FROM clinic_off_days WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Off-day not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Off-day deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Bulk create off-days (for holidays)
const bulkCreateOffDays = async (req, res, next) => {
    try {
        const { dates } = req.body;

        if (!Array.isArray(dates) || dates.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'dates array is required'
            });
        }

        const values = dates.map(item => [
            item.off_date,
            item.reason || null
        ]);

        // Use INSERT IGNORE to skip duplicates
        await pool.query(`
            INSERT IGNORE INTO clinic_off_days (off_date, reason)
            VALUES ?
        `, [values]);

        res.status(201).json({
            success: true,
            message: 'Off-days created successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllOffDays,
    getUpcomingOffDays,
    getOffDaysByRange,
    createOffDay,
    updateOffDay,
    deleteOffDay,
    bulkCreateOffDays
};
