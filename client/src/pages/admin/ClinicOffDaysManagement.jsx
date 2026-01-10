import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/admin/Management.module.css';

const ClinicOffDaysManagement = () => {
    const [offDays, setOffDays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingOffDay, setEditingOffDay] = useState(null);
    const [formData, setFormData] = useState({
        off_date: '',
        reason: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchOffDays();
    }, []);

    const fetchOffDays = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/clinic-off-days/upcoming`);
            setOffDays(response.data.data || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch off-days');
            setLoading(false);
        }
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

            if (editingOffDay) {
                // Update existing off-day
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/clinic-off-days/${editingOffDay.id}`,
                    formData,
                    { headers }
                );
                setSuccess('Off-day updated successfully!');
            } else {
                // Create new off-day
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/clinic-off-days`,
                    formData,
                    { headers }
                );
                setSuccess('Off-day created successfully!');
            }

            resetForm();
            fetchOffDays();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save off-day');
        }
    };

    const handleEdit = (offDay) => {
        setEditingOffDay(offDay);
        setFormData({
            off_date: offDay.off_date,
            reason: offDay.reason || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this off-day?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/clinic-off-days/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Off-day deleted successfully!');
            fetchOffDays();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete off-day');
        }
    };

    const resetForm = () => {
        setFormData({
            off_date: '',
            reason: ''
        });
        setEditingOffDay(null);
        setShowForm(false);
    };

    const addToday = () => {
        const today = new Date().toISOString().split('T')[0];
        setFormData({ off_date: today, reason: '' });
        setShowForm(true);
    };

    const addTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setFormData({ off_date: tomorrow.toISOString().split('T')[0], reason: '' });
        setShowForm(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    if (loading) {
        return <div className={styles.loading}>Loading off-days...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Clinic Off-Days Management</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className={styles.addButton}
                        onClick={addToday}
                        style={{ background: '#ff9800' }}
                    >
                        + Add Today
                    </button>
                    <button
                        className={styles.addButton}
                        onClick={addTomorrow}
                        style={{ background: '#7CC339' }}
                    >
                        + Add Tomorrow
                    </button>
                    <button
                        className={styles.addButton}
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : '+ Add Off-Day'}
                    </button>
                </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {showForm && (
                <div className={styles.formCard}>
                    <h2 className={styles.formTitle}>
                        {editingOffDay ? 'Edit Off-Day' : 'Add New Off-Day'}
                    </h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Date *</label>
                                <input
                                    type="date"
                                    name="off_date"
                                    value={formData.off_date}
                                    onChange={handleInputChange}
                                    min={getTodayDate()}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Reason</label>
                                <input
                                    type="text"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Republic Day, Diwali"
                                />
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.submitBtn}>
                                {editingOffDay ? 'Update Off-Day' : 'Create Off-Day'}
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
                <h2 style={{ padding: '16px', margin: 0, fontSize: '18px', fontWeight: 600 }}>
                    Upcoming Off-Days ({offDays.length})
                </h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offDays.length === 0 ? (
                            <tr>
                                <td colSpan="4" className={styles.noData}>
                                    No upcoming off-days. Add your first off-day!
                                </td>
                            </tr>
                        ) : (
                            offDays.map(offDay => {
                                const date = new Date(offDay.off_date);
                                const dayName = date.toLocaleDateString('en-IN', { weekday: 'long' });

                                return (
                                    <tr key={offDay.id}>
                                        <td style={{ fontWeight: 600 }}>
                                            {formatDate(offDay.off_date)}
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '4px 8px',
                                                background: '#e3f2fd',
                                                borderRadius: '4px',
                                                fontSize: '13px'
                                            }}>
                                                {dayName}
                                            </span>
                                        </td>
                                        <td>{offDay.reason || '-'}</td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    onClick={() => handleEdit(offDay)}
                                                    className={styles.editBtn}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(offDay.id)}
                                                    className={styles.deleteBtn}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClinicOffDaysManagement;
