const express = require('express');
const router = express.Router();
const {
    getAvailableSlots,
    bookAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment
} = require('../controllers/appointmentController');
const { verifyToken, isAdmin, canManageAppointments } = require('../middleware/auth');

// Public routes
router.get('/available-slots', getAvailableSlots);
router.post('/', bookAppointment);

// Protected routes - accessible by admin and appointment_manager
router.get('/admin', verifyToken, canManageAppointments, getAllAppointments);
router.put('/:id/status', verifyToken, canManageAppointments, updateAppointmentStatus);
router.delete('/:id', verifyToken, canManageAppointments, deleteAppointment);

module.exports = router;
