const express = require('express');
const router = express.Router();
const {
    getDoctors,
    getDoctorDetails,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    uploadDoctorImage
} = require('../controllers/doctorController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctorDetails);

// Protected admin routes
router.post('/', verifyToken, isAdmin, createDoctor);
router.put('/:id', verifyToken, isAdmin, updateDoctor);
router.delete('/:id', verifyToken, isAdmin, deleteDoctor);
router.post('/:id/upload-image', verifyToken, isAdmin, upload.single('image'), uploadDoctorImage);

module.exports = router;
