import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/admin/Management.module.css';

const DoctorsManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        specialization: '',
        experience: '',
        description: '',
        consultation_fee: '',
        qualifications: ['']
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleQualificationChange = (index, value) => {
        const newQualifications = [...formData.qualifications];
        newQualifications[index] = value;
        setFormData(prev => ({ ...prev, qualifications: newQualifications }));
    };

    const addQualification = () => {
        setFormData(prev => ({
            ...prev,
            qualifications: [...prev.qualifications, '']
        }));
    };

    const removeQualification = (index) => {
        const newQualifications = formData.qualifications.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, qualifications: newQualifications }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            // Filter out empty qualifications
            const cleanedData = {
                ...formData,
                qualifications: formData.qualifications.filter(q => q.trim() !== '')
            };

            let doctorId;

            if (editingDoctor) {
                // Update existing doctor
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/doctors/${editingDoctor.id}`,
                    cleanedData,
                    { headers }
                );
                doctorId = editingDoctor.id;
                setSuccess('Doctor updated successfully!');
            } else {
                // Create new doctor
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/doctors`,
                    cleanedData,
                    { headers }
                );
                doctorId = response.data.data.id;
                setSuccess('Doctor created successfully!');
            }

            // Upload image if selected
            if (imageFile && doctorId) {
                const formDataImg = new FormData();
                formDataImg.append('image', imageFile);

                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/doctors/${doctorId}/upload-image`,
                    formDataImg,
                    { headers }
                );
            }

            // Reset form and refresh list
            resetForm();
            fetchDoctors();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save doctor');
        }
    };

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setFormData({
            name: doctor.name,
            designation: doctor.designation,
            specialization: doctor.specialization,
            experience: doctor.experience,
            description: doctor.description || '',
            consultation_fee: doctor.consultation_fee,
            qualifications: doctor.qualifications.length > 0 ? doctor.qualifications : ['']
        });
        setImagePreview(doctor.image_url ? `${import.meta.env.VITE_API_URL}${doctor.image_url}` : null);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this doctor?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/doctors/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Doctor deleted successfully!');
            fetchDoctors();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete doctor');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            designation: '',
            specialization: '',
            experience: '',
            description: '',
            consultation_fee: '',
            qualifications: ['']
        });
        setImageFile(null);
        setImagePreview(null);
        setEditingDoctor(null);
        setShowForm(false);
    };

    if (loading) {
        return <div className={styles.loading}>Loading doctors...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Doctors Management</h1>
                <button
                    className={styles.addButton}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add Doctor'}
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {showForm && (
                <div className={styles.formCard}>
                    <h2 className={styles.formTitle}>
                        {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
                    </h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Designation *</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Specialization *</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Experience (years)</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Consultation Fee</label>
                            <input
                                type="number"
                                name="consultation_fee"
                                value={formData.consultation_fee}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="3"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Qualifications</label>
                            {formData.qualifications.map((qual, index) => (
                                <div key={index} className={styles.qualificationRow}>
                                    <input
                                        type="text"
                                        value={qual}
                                        onChange={(e) => handleQualificationChange(index, e.target.value)}
                                        placeholder="e.g., MBBS, MD"
                                    />
                                    {formData.qualifications.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeQualification(index)}
                                            className={styles.removeBtn}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addQualification}
                                className={styles.addQualBtn}
                            >
                                + Add Qualification
                            </button>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Doctor Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className={styles.imagePreview}
                                />
                            )}
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.submitBtn}>
                                {editingDoctor ? 'Update Doctor' : 'Create Doctor'}
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
                            <th>Image</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Specialization</th>
                            <th>Experience</th>
                            <th>Fee</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.length === 0 ? (
                            <tr>
                                <td colSpan="7" className={styles.noData}>
                                    No doctors found. Add your first doctor!
                                </td>
                            </tr>
                        ) : (
                            doctors.map(doctor => (
                                <tr key={doctor.id}>
                                    <td>
                                        {doctor.image_url ? (
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}${doctor.image_url}`}
                                                alt={doctor.name}
                                                className={styles.tableImage}
                                            />
                                        ) : (
                                            <div className={styles.noImage}>No Image</div>
                                        )}
                                    </td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.designation}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>{doctor.experience} years</td>
                                    <td>₹{doctor.consultation_fee}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                onClick={() => handleEdit(doctor)}
                                                className={styles.editBtn}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(doctor.id)}
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
        </div>
    );
};

export default DoctorsManagement;
