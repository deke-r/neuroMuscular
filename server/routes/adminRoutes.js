const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
    changePassword,
    getAllManagers,
    createManager,
    updateManager,
    toggleManagerStatus,
    deleteManager
} = require('../controllers/adminController');

// All routes require admin authentication
router.use(verifyToken, isAdmin);

// Password management
router.post('/change-password', changePassword);

// Manager management
router.get('/managers', getAllManagers);
router.post('/managers', createManager);
router.put('/managers/:id', updateManager);
router.patch('/managers/:id/status', toggleManagerStatus);
router.delete('/managers/:id', deleteManager);

module.exports = router;
