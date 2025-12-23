import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/admin/Management.module.css';

const ManagersManagement = () => {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingManager, setEditingManager] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/admin/managers`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setManagers(response.data.data || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch managers');
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

            if (editingManager) {
                // Update existing manager
                const updateData = {
                    username: formData.username,
                    email: formData.email
                };
                // Only include password if it's provided
                if (formData.password) {
                    updateData.password = formData.password;
                }

                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/admin/managers/${editingManager.id}`,
                    updateData,
                    { headers }
                );
                setSuccess('Manager updated successfully!');
            } else {
                // Create new manager
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/admin/managers`,
                    formData,
                    { headers }
                );
                setSuccess('Manager created successfully!');
            }

            resetForm();
            fetchManagers();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save manager');
        }
    };

    const handleEdit = (manager) => {
        setEditingManager(manager);
        setFormData({
            username: manager.username,
            email: manager.email,
            password: '' // Don't pre-fill password
        });
        setShowForm(true);
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/admin/managers/${id}/status`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess(`Manager ${currentStatus ? 'deactivated' : 'activated'} successfully!`);
            fetchManagers();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to update manager status');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this manager?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/admin/managers/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Manager deleted successfully!');
            fetchManagers();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete manager');
        }
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: ''
        });
        setEditingManager(null);
        setShowForm(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return <div className={styles.loading}>Loading managers...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Managers Management</h1>
                <button
                    className={styles.addButton}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add Manager'}
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {showForm && (
                <div className={styles.formCard}>
                    <h2 className={styles.formTitle}>
                        {editingManager ? 'Edit Manager' : 'Add New Manager'}
                    </h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Username *</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                Password {editingManager ? '(leave blank to keep current)' : '*'}
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required={!editingManager}
                                    minLength="6"
                                    style={{ paddingRight: '40px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        padding: '0',
                                        color: '#666'
                                    }}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {!editingManager && (
                                <small className={styles.helpText}>Minimum 6 characters</small>
                            )}
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.submitBtn}>
                                {editingManager ? 'Update Manager' : 'Create Manager'}
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
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className={styles.noData}>
                                    No managers found. Add your first manager!
                                </td>
                            </tr>
                        ) : (
                            managers.map(manager => (
                                <tr key={manager.id}>
                                    <td><strong>{manager.username}</strong></td>
                                    <td>{manager.email}</td>
                                    <td>
                                        <span className={styles.roleBadge}>
                                            {manager.role === 'appointment_manager' ? 'Appointment Manager' : 'Manager'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${manager.is_active ? styles.statusActive : styles.statusInactive}`}>
                                            {manager.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>{formatDate(manager.created_at)}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                onClick={() => handleEdit(manager)}
                                                className={styles.editBtn}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleToggleStatus(manager.id, manager.is_active)}
                                                className={manager.is_active ? styles.deactivateBtn : styles.activateBtn}
                                            >
                                                {manager.is_active ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(manager.id)}
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

export default ManagersManagement;
