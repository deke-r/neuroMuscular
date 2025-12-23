const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

// Change admin password
const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters long'
            });
        }

        // Get current user
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const user = users[0];

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, userId]);

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get all managers
const getAllManagers = async (req, res, next) => {
    try {
        const [managers] = await pool.query(`
            SELECT id, username, email, role, is_active, created_at
            FROM users
            WHERE role IN ('manager', 'appointment_manager')
            ORDER BY created_at DESC
        `);

        res.status(200).json({
            success: true,
            data: managers
        });
    } catch (error) {
        next(error);
    }
};

// Create new manager
const createManager = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, and password are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if username or email already exists
        const [existing] = await pool.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create manager
        const [result] = await pool.query(`
            INSERT INTO users (username, email, password_hash, role, is_active)
            VALUES (?, ?, ?, 'manager', TRUE)
        `, [username, email, hashedPassword]);

        res.status(201).json({
            success: true,
            message: 'Manager created successfully',
            data: {
                id: result.insertId,
                username,
                email,
                role: 'manager',
                is_active: true
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update manager
const updateManager = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        // Check if manager exists
        const [managers] = await pool.query(
            'SELECT * FROM users WHERE id = ? AND role IN (?, ?)',
            [id, 'manager', 'appointment_manager']
        );

        if (managers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Manager not found'
            });
        }

        // Check if username or email is taken by another user
        const [existing] = await pool.query(
            'SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?',
            [username, email, id]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        // Update manager
        let updateQuery = 'UPDATE users SET username = ?, email = ?';
        let params = [username, email];

        // If password is provided, update it too
        if (password && password.length >= 6) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateQuery += ', password_hash = ?';
            params.push(hashedPassword);
        }

        updateQuery += ' WHERE id = ?';
        params.push(id);

        await pool.query(updateQuery, params);

        res.status(200).json({
            success: true,
            message: 'Manager updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Toggle manager status (activate/deactivate)
const toggleManagerStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if manager exists
        const [managers] = await pool.query(
            'SELECT * FROM users WHERE id = ? AND role IN (?, ?)',
            [id, 'manager', 'appointment_manager']
        );

        if (managers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Manager not found'
            });
        }

        const currentStatus = managers[0].is_active;
        const newStatus = !currentStatus;

        // Toggle status
        await pool.query('UPDATE users SET is_active = ? WHERE id = ?', [newStatus, id]);

        res.status(200).json({
            success: true,
            message: `Manager ${newStatus ? 'activated' : 'deactivated'} successfully`,
            data: { is_active: newStatus }
        });
    } catch (error) {
        next(error);
    }
};

// Delete manager
const deleteManager = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if manager exists
        const [managers] = await pool.query(
            'SELECT * FROM users WHERE id = ? AND role IN (?, ?)',
            [id, 'manager', 'appointment_manager']
        );

        if (managers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Manager not found'
            });
        }

        // Delete manager
        await pool.query('DELETE FROM users WHERE id = ?', [id]);

        res.status(200).json({
            success: true,
            message: 'Manager deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    changePassword,
    getAllManagers,
    createManager,
    updateManager,
    toggleManagerStatus,
    deleteManager
};
