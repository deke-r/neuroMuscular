const express = require('express');
const router = express.Router();
const {
    getAllOffDays,
    getUpcomingOffDays,
    getOffDaysByRange,
    createOffDay,
    updateOffDay,
    deleteOffDay,
    bulkCreateOffDays
} = require('../controllers/clinicOffDaysController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes (for appointment booking to check off-days)
router.get('/', getAllOffDays);
router.get('/upcoming', getUpcomingOffDays);
router.get('/range', getOffDaysByRange);

// Protected routes (admin only)
router.post('/', verifyToken, isAdmin, createOffDay);
router.post('/bulk', verifyToken, isAdmin, bulkCreateOffDays);
router.put('/:id', verifyToken, isAdmin, updateOffDay);
router.delete('/:id', verifyToken, isAdmin, deleteOffDay);

module.exports = router;
