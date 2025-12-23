const express = require('express');
const router = express.Router();
const {
    getAvailableSlots,
    bookAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment
} = require('../controllers/appointmentController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/available-slots', getAvailableSlots);
router.post('/', bookAppointment);

// Protected admin routes
router.get('/admin', verifyToken, isAdmin, getAllAppointments);
router.put('/:id/status', verifyToken, isAdmin, updateAppointmentStatus);
router.delete('/:id', verifyToken, isAdmin, deleteAppointment);

module.exports = router;
