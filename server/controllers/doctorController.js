const { pool } = require('../config/database');
const path = require('path');
const fs = require('fs');

// Get all doctors
const getDoctors = async (req, res, next) => {
    try {
        const [doctors] = await pool.query(`
            SELECT 
                d.id,
                d.name,
                d.designation,
                d.specialization,
                d.experience,
                d.image_url,
                d.description,
                d.consultation_fee,
                GROUP_CONCAT(q.qualification ORDER BY q.display_order SEPARATOR '|') as qualifications
            FROM doctors d
            LEFT JOIN qualifications q ON d.id = q.doctor_id
            WHERE d.is_active = TRUE
            GROUP BY d.id
            ORDER BY d.id
        `);

        // Format qualifications as array
        const formattedDoctors = doctors.map(doctor => ({
            ...doctor,
            qualifications: doctor.qualifications ? doctor.qualifications.split('|') : []
        }));

        res.status(200).json({
            success: true,
            count: formattedDoctors.length,
            data: formattedDoctors
        });
    } catch (error) {
        next(error);
    }
};

// Get single doctor by ID
const getDoctorDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [doctors] = await pool.query(`
            SELECT 
                d.id,
                d.name,
                d.designation,
                d.specialization,
                d.experience,
                d.image_url,
                d.description,
                d.consultation_fee,
                GROUP_CONCAT(q.qualification ORDER BY q.display_order SEPARATOR '|') as qualifications
            FROM doctors d
            LEFT JOIN qualifications q ON d.id = q.doctor_id
            WHERE d.id = ? AND d.is_active = TRUE
            GROUP BY d.id
        `, [id]);

        if (doctors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        const doctor = {
            ...doctors[0],
            qualifications: doctors[0].qualifications ? doctors[0].qualifications.split('|') : []
        };

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        next(error);
    }
};

// Create new doctor
const createDoctor = async (req, res, next) => {
    try {
        const {
            name,
            designation,
            specialization,
            experience,
            description,
            consultation_fee,
            qualifications
        } = req.body;

        if (!name || !designation || !specialization) {
            return res.status(400).json({
                success: false,
                message: 'Name, designation, and specialization are required'
            });
        }

        // Insert doctor
        const [result] = await pool.query(`
            INSERT INTO doctors (name, designation, specialization, experience, description, consultation_fee, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [name, designation, specialization, experience || 0, description || '', consultation_fee || 0, '']);

        const doctorId = result.insertId;

        // Insert qualifications if provided
        if (qualifications && Array.isArray(qualifications) && qualifications.length > 0) {
            const qualValues = qualifications.map((qual, index) => [doctorId, qual, index]);
            await pool.query(`
                INSERT INTO qualifications (doctor_id, qualification, display_order)
                VALUES ?
            `, [qualValues]);
        }

        res.status(201).json({
            success: true,
            message: 'Doctor created successfully',
            data: { id: doctorId }
        });
    } catch (error) {
        next(error);
    }
};

// Update doctor
const updateDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            name,
            designation,
            specialization,
            experience,
            description,
            consultation_fee,
            qualifications
        } = req.body;

        // Check if doctor exists
        const [existing] = await pool.query('SELECT id FROM doctors WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Update doctor
        await pool.query(`
            UPDATE doctors
            SET name = ?, designation = ?, specialization = ?, experience = ?, 
                description = ?, consultation_fee = ?
            WHERE id = ?
        `, [name, designation, specialization, experience, description, consultation_fee, id]);

        // Update qualifications - delete old and insert new
        if (qualifications && Array.isArray(qualifications)) {
            await pool.query('DELETE FROM qualifications WHERE doctor_id = ?', [id]);

            if (qualifications.length > 0) {
                const qualValues = qualifications.map((qual, index) => [id, qual, index]);
                await pool.query(`
                    INSERT INTO qualifications (doctor_id, qualification, display_order)
                    VALUES ?
                `, [qualValues]);
            }
        }

        res.status(200).json({
            success: true,
            message: 'Doctor updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Delete doctor (soft delete)
const deleteDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(`
            UPDATE doctors
            SET is_active = FALSE
            WHERE id = ?
        `, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Doctor deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Upload doctor image
const uploadDoctorImage = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        // Get old image URL to delete old file
        const [doctors] = await pool.query('SELECT image_url FROM doctors WHERE id = ?', [id]);
        if (doctors.length === 0) {
            // Delete uploaded file if doctor not found
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Delete old image file if exists
        const oldImageUrl = doctors[0].image_url;
        if (oldImageUrl) {
            const oldImagePath = path.join(__dirname, '../uploads/doctors', path.basename(oldImageUrl));
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update doctor with new image URL
        const imageUrl = `/uploads/doctors/${req.file.filename}`;
        await pool.query('UPDATE doctors SET image_url = ? WHERE id = ?', [imageUrl, id]);

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: { image_url: imageUrl }
        });
    } catch (error) {
        // Delete uploaded file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

module.exports = {
    getDoctors,
    getDoctorDetails,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    uploadDoctorImage
};
