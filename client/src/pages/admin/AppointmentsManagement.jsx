import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/admin/Management.module.css';

const AppointmentsManagement = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchAppointments();
    }, [filterStatus]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            let url = `${import.meta.env.VITE_API_URL}/api/appointments/admin`;
            if (filterStatus !== 'all') {
                url += `?status=${filterStatus}`;
            }

            const response = await axios.get(url, { headers });
            setAppointments(response.data.data || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch appointments');
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/appointments/${id}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Appointment status updated successfully!');
            fetchAppointments();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to update appointment status');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this appointment?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/appointments/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Appointment deleted successfully!');
            fetchAppointments();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete appointment');
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'confirmed':
                return styles.statusConfirmed;
            case 'completed':
                return styles.statusCompleted;
            case 'cancelled':
                return styles.statusCancelled;
            default:
                return styles.statusPending;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    if (loading) {
        return <div className={styles.loading}>Loading appointments...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Appointments Management</h1>
                <div className={styles.filterGroup}>
                    <label>Filter by Status:</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan="8" className={styles.noData}>
                                    No appointments found.
                                </td>
                            </tr>
                        ) : (
                            appointments.map(appointment => (
                                <tr key={appointment.id}>
                                    <td>
                                        <div>
                                            <strong>{appointment.patient_name}</strong>
                                            {appointment.patient_age && (
                                                <div className={styles.subText}>
                                                    {appointment.patient_age} yrs
                                                    {appointment.patient_gender && `, ${appointment.patient_gender}`}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>{appointment.doctor_name || 'N/A'}</td>
                                    <td>{appointment.service_name || 'N/A'}</td>
                                    <td>{formatDate(appointment.appointment_date)}</td>
                                    <td>{formatTime(appointment.appointment_time)}</td>
                                    <td>
                                        <div className={styles.contactInfo}>
                                            <div>{appointment.patient_phone}</div>
                                            <div className={styles.subText}>{appointment.patient_email}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            {appointment.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                                                    className={styles.confirmBtn}
                                                    title="Confirm"
                                                >
                                                    ✓
                                                </button>
                                            )}
                                            {appointment.status === 'confirmed' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                                                    className={styles.completeBtn}
                                                    title="Mark Complete"
                                                >
                                                    ✓✓
                                                </button>
                                            )}
                                            {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                                                <button
                                                    onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                                                    className={styles.cancelBtn}
                                                    title="Cancel"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(appointment.id)}
                                                className={styles.deleteBtn}
                                                title="Delete"
                                            >
                                                🗑
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

export default AppointmentsManagement;
