import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/admin/Management.module.css';

const ServicesManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        service_name: '',
        service_description: '',
        duration_minutes: '30',
        price: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`);
            setDoctors(response.data.data || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch doctors');
            setLoading(false);
        }
    };

    const fetchServices = async (doctorId) => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/services?doctorId=${doctorId}`,
                { headers }
            );
            setServices(response.data.data || []);
        } catch (err) {
            setError('Failed to fetch services');
        }
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        fetchServices(doctor.id);
        setShowForm(false);
        setEditingService(null);
    };

    const handleChangeDoctor = () => {
        setSelectedDoctor(null);
        setServices([]);
        setShowForm(false);
        setEditingService(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const payload = {
                ...formData,
                doctor_id: selectedDoctor.id
            };

            if (editingService) {
                // Update existing service
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/services/${editingService.id}`,
                    payload,
                    { headers }
                );
                setSuccess('Service updated successfully!');
            } else {
                // Create new service
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/services`,
                    payload,
                    { headers }
                );
                setSuccess('Service created successfully!');
            }

            // Reset form and refresh list
            resetForm();
            fetchServices(selectedDoctor.id);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save service');
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({
            service_name: service.service_name,
            service_description: service.service_description || '',
            duration_minutes: service.duration_minutes,
            price: service.price
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/services/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Service deleted successfully!');
            fetchServices(selectedDoctor.id);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete service');
        }
    };

    const resetForm = () => {
        setFormData({
            service_name: '',
            service_description: '',
            duration_minutes: '30',
            price: ''
        });
        setEditingService(null);
        setShowForm(false);
    };

    if (loading) {
        return <div className={styles.loading}>Loading doctors...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Services Management</h1>
                {selectedDoctor && (
                    <button
                        className={styles.addButton}
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : '+ Add Service'}
                    </button>
                )}
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <div className={styles.formCard}>
                <div className={styles.formGroup}>
                    <label>Select Doctor *</label>
                    <select
                        className={styles.selectDoctor}
                        value={selectedDoctor?.id || ''}
                        onChange={(e) => {
                            const doctor = doctors.find(d => d.id === parseInt(e.target.value));
                            if (doctor) handleDoctorSelect(doctor);
                        }}
                    >
                        <option value="">Choose a doctor</option>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name} - {doctor.specialization}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {!selectedDoctor ? (
                <div className={styles.noSelection}>
                    <p>Please select a doctor to view and manage their services</p>
                </div>
            ) : (
                <>
                    {showForm && (
                        <div className={styles.formCard}>
                            <h2 className={styles.formTitle}>
                                {editingService ? 'Edit Service' : 'Add New Service'}
                            </h2>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>Service Name *</label>
                                    <input
                                        type="text"
                                        name="service_name"
                                        value={formData.service_name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g., Consultation, Therapy Session"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Description</label>
                                    <textarea
                                        name="service_description"
                                        value={formData.service_description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder="Describe the service..."
                                    />
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Duration (minutes)</label>
                                        <input
                                            type="number"
                                            name="duration_minutes"
                                            value={formData.duration_minutes}
                                            onChange={handleInputChange}
                                            min="15"
                                            step="15"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Price (₹)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formActions}>
                                    <button type="submit" className={styles.submitBtn}>
                                        {editingService ? 'Update Service' : 'Create Service'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className={styles.cancelBtn}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className={styles.tableCard}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Service Name</th>
                                    <th>Duration</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className={styles.noData}>
                                            No services found for this doctor. Add your first service!
                                        </td>
                                    </tr>
                                ) : (
                                    services.map(service => (
                                        <tr key={service.id}>
                                            <td><strong>{service.service_name}</strong></td>
                                            <td>{service.duration_minutes} min</td>
                                            <td>₹{service.price}</td>
                                            <td className={styles.descriptionCell}>
                                                {service.service_description || 'No description'}
                                            </td>
                                            <td>
                                                <div className={styles.actions}>
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className={styles.editBtn}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(service.id)}
                                                        className={styles.deleteBtn}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ServicesManagement;
