const express = require('express');
const router = express.Router();
const {
    getAvailableSlots,
    bookAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    rescheduleAppointment
} = require('../controllers/appointmentController');
const { verifyToken, isAdmin, canManageAppointments } = require('../middleware/auth');

// Public routes
router.get('/available-slots', getAvailableSlots);
router.post('/', bookAppointment);

// Protected routes - accessible by admin and appointment_manager
router.get('/admin', verifyToken, canManageAppointments, getAllAppointments);
router.put('/:id/status', verifyToken, canManageAppointments, updateAppointmentStatus);
router.put('/:id/reschedule', verifyToken, canManageAppointments, rescheduleAppointment);

module.exports = router;
