const express = require('express');
const router = express.Router();
const {
    getAllWorkingHours,
    getDoctorWorkingHours,
    upsertWorkingHours,
    createWorkingHour,
    updateWorkingHour,
    deleteWorkingHour
} = require('../controllers/workingHoursController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllWorkingHours);
router.get('/doctor/:doctorId', getDoctorWorkingHours);

// Protected routes (admin only)
router.post('/', verifyToken, isAdmin, createWorkingHour);
router.put('/doctor/:doctorId', verifyToken, isAdmin, upsertWorkingHours);
router.put('/:id', verifyToken, isAdmin, updateWorkingHour);
router.delete('/:id', verifyToken, isAdmin, deleteWorkingHour);

module.exports = router;
