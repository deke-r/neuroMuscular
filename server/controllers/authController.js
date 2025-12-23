const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../utils/emailService');

// Login - Support both plain text and hashed passwords
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Get user from database
        const [users] = await pool.query(`
            SELECT id, username, email, password_hash, full_name, role, is_active
            FROM users
            WHERE email = ? AND is_active = TRUE
        `, [email]);

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const user = users[0];

        // Check if password is hashed or plain text
        let isPasswordValid = false;

        // Try bcrypt comparison first (for hashed passwords)
        try {
            isPasswordValid = await bcrypt.compare(password, user.password_hash);
        } catch (error) {
            // If bcrypt fails, it might be plain text - compare directly
            isPasswordValid = password === user.password_hash;
        }

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET || 'your-secret-key-change-this',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// Forgot Password - Send OTP
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Check if user exists
        const [users] = await pool.query(`
            SELECT id, email, full_name
            FROM users
            WHERE email = ? AND is_active = TRUE
        `, [email]);

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email address'
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Delete any existing OTPs for this email
        await pool.query(`
            DELETE FROM otp_codes WHERE email = ?
        `, [email]);

        // Store OTP in database (expires in 5 minutes)
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await pool.query(`
            INSERT INTO otp_codes (email, otp_code, expires_at)
            VALUES (?, ?, ?)
        `, [email, otp, expiresAt]);

        // Send OTP email
        await sendOTPEmail(email, otp);

        res.status(200).json({
            success: true,
            message: 'OTP sent to your email address'
        });
    } catch (error) {
        next(error);
    }
};

// Verify OTP
const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        // Get OTP from database
        const [otpRecords] = await pool.query(`
            SELECT id, otp_code, expires_at
            FROM otp_codes
            WHERE email = ?
            ORDER BY created_at DESC
            LIMIT 1
        `, [email]);

        if (otpRecords.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No OTP found. Please request a new one.'
            });
        }

        const otpRecord = otpRecords[0];

        // Check if OTP is expired
        if (new Date() > new Date(otpRecord.expires_at)) {
            await pool.query(`DELETE FROM otp_codes WHERE id = ?`, [otpRecord.id]);
            return res.status(400).json({
                success: false,
                message: 'OTP has expired. Please request a new one.'
            });
        }

        // Verify OTP
        if (otp !== otpRecord.otp_code) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP. Please try again.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'OTP verified successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Reset Password
const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Email, OTP, and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Verify OTP again
        const [otpRecords] = await pool.query(`
            SELECT id, otp_code, expires_at
            FROM otp_codes
            WHERE email = ?
            ORDER BY created_at DESC
            LIMIT 1
        `, [email]);

        if (otpRecords.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No OTP found. Please request a new one.'
            });
        }

        const otpRecord = otpRecords[0];

        // Check if OTP is expired
        if (new Date() > new Date(otpRecord.expires_at)) {
            await pool.query(`DELETE FROM otp_codes WHERE id = ?`, [otpRecord.id]);
            return res.status(400).json({
                success: false,
                message: 'OTP has expired. Please request a new one.'
            });
        }

        // Verify OTP
        if (otp !== otpRecord.otp_code) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP. Please try again.'
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(newPassword, salt);

        // Update user password
        const [result] = await pool.query(`
            UPDATE users
            SET password_hash = ?
            WHERE email = ?
        `, [password_hash, email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete used OTP
        await pool.query(`DELETE FROM otp_codes WHERE id = ?`, [otpRecord.id]);

        res.status(200).json({
            success: true,
            message: 'Password reset successful. You can now login with your new password.'
        });
    } catch (error) {
        next(error);
    }
};

// Setup password (for initial setup or password reset)
const setupPassword = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Update user password
        const [result] = await pool.query(`
            UPDATE users
            SET password_hash = ?
            WHERE username = ?
        `, [password_hash, username]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    setupPassword
};
