const express = require('express');
const router = express.Router();
const { login, setupPassword, forgotPassword, verifyOTP, resetPassword } = require('../controllers/authController');

// POST /api/auth/login - Login
router.post('/login', login);

// POST /api/auth/setup-password - Setup/Reset password
router.post('/setup-password', setupPassword);

// POST /api/auth/forgot-password - Send OTP to email
router.post('/forgot-password', forgotPassword);

// POST /api/auth/verify-otp - Verify OTP code
router.post('/verify-otp', verifyOTP);

// POST /api/auth/reset-password - Reset password with OTP
router.post('/reset-password', resetPassword);

module.exports = router;
