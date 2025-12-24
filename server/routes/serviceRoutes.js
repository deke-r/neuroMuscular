const express = require('express');
const router = express.Router();
const {
    getAllServices,
    getServicesByDoctor,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllServices);
router.get('/doctor/:doctorId', getServicesByDoctor);

// Protected admin routes
router.post('/', verifyToken, isAdmin, createService);
router.put('/:id', verifyToken, isAdmin, updateService);
router.delete('/:id', verifyToken, isAdmin, deleteService);

module.exports = router;
