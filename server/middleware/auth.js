const jwt = require('jsonwebtoken');

// Verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
        req.user = decoded; // { id, username, role }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
    next();
};

// Check if user is admin or appointment manager
const canManageAppointments = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'appointment_manager') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Insufficient privileges.'
        });
    }
    next();
};

// Check if user can modify appointments (admin only)
const canModifyAppointments = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Only admins can modify appointments.'
        });
    }
    next();
};

module.exports = {
    verifyToken,
    isAdmin,
    canManageAppointments,
    canModifyAppointments
};
