const { pool } = require('../config/database');

// Get all services
const getAllServices = async (req, res, next) => {
    try {
        const [services] = await pool.query(`
            SELECT 
                s.id,
                s.doctor_id,
                s.service_name,
                s.service_description,
                s.duration_minutes,
                s.price,
                d.name as doctor_name
            FROM services s
            LEFT JOIN doctors d ON s.doctor_id = d.id
            WHERE s.is_active = TRUE
            ORDER BY s.service_name
        `);

        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// Get services for a specific doctor
const getServicesByDoctor = async (req, res, next) => {
    try {
        const { doctorId } = req.params;

        const [services] = await pool.query(`
            SELECT 
                id,
                doctor_id,
                service_name,
                service_description,
                duration_minutes,
                price
            FROM services
            WHERE doctor_id = ? AND is_active = TRUE
            ORDER BY service_name
        `, [doctorId]);

        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// Create new service
const createService = async (req, res, next) => {
    try {
        const {
            doctor_id,
            service_name,
            service_description,
            duration_minutes,
            price
        } = req.body;

        if (!doctor_id || !service_name) {
            return res.status(400).json({
                success: false,
                message: 'Doctor ID and service name are required'
            });
        }

        const [result] = await pool.query(`
            INSERT INTO services (doctor_id, service_name, service_description, duration_minutes, price)
            VALUES (?, ?, ?, ?, ?)
        `, [doctor_id, service_name, service_description || '', duration_minutes || 30, price || 0]);

        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

// Update service
const updateService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            doctor_id,
            service_name,
            service_description,
            duration_minutes,
            price
        } = req.body;

        const [result] = await pool.query(`
            UPDATE services
            SET doctor_id = ?, service_name = ?, service_description = ?, 
                duration_minutes = ?, price = ?
            WHERE id = ?
        `, [doctor_id, service_name, service_description, duration_minutes, price, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Delete service (soft delete)
const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(`
            UPDATE services
            SET is_active = FALSE
            WHERE id = ?
        `, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllServices,
    getServicesByDoctor,
    createService,
    updateService,
    deleteService
};
