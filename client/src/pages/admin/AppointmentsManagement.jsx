import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/admin/Management.module.css';

const AppointmentsManagement = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const itemsPerPage = 10;

    // Reschedule modal state
    const [rescheduleModal, setRescheduleModal] = useState({ show: false, appointment: null });
    const [availableSlots, setAvailableSlots] = useState([]);
    const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [offDays, setOffDays] = useState([]);

    useEffect(() => {
        fetchAppointments();
        loadOffDays();
    }, [filterStatus, currentPage]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const offset = (currentPage - 1) * itemsPerPage;
            let url = `${import.meta.env.VITE_API_URL}/api/appointments/admin?limit=${itemsPerPage}&offset=${offset}`;
            if (filterStatus !== 'all') {
                url += `&status=${filterStatus}`;
            }

            const response = await axios.get(url, { headers });
            setAppointments(response.data.data || []);
            setTotalAppointments(response.data.total || 0);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch appointments');
            setLoading(false);
        }
    };

    const loadOffDays = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/clinic-off-days/upcoming`);
            const fetchedOffDays = response.data.data || [];
            const normalizedOffDays = fetchedOffDays.map(od => ({
                ...od,
                off_date: od.off_date.split('T')[0]
            }));
            setOffDays(normalizedOffDays);
        } catch (err) {
            console.error('Failed to load off-days:', err);
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

    const handleRescheduleClick = (appointment) => {
        setRescheduleModal({ show: true, appointment });
        setRescheduleData({ date: '', time: '' });
        setAvailableSlots([]);
    };

    const fetchAvailableSlots = async (date) => {
        if (!date || !rescheduleModal.appointment) return;

        try {
            setLoadingSlots(true);
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/appointments/available-slots?doctorId=${rescheduleModal.appointment.doctor_id}&date=${date}`
            );
            setAvailableSlots(response.data.data?.availableSlots || []);
            setLoadingSlots(false);
        } catch (err) {
            setError('Failed to fetch available slots');
            setLoadingSlots(false);
        }
    };

    // Check if a date is an off-day
    const isOffDay = (dateString) => {
        return offDays.some(offDay => offDay.off_date === dateString);
    };

    // Filter function for react-datepicker
    const filterDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        return !isOffDay(dateString);
    };

    const handleDateChange = (date) => {
        if (!date) {
            setRescheduleData({ date: '', time: '' });
            return;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        setRescheduleData({ date: dateString, time: '' });
        fetchAvailableSlots(dateString);
    };

    const handleRescheduleSubmit = async () => {
        if (!rescheduleData.date || !rescheduleData.time) {
            setError('Please select both date and time');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/appointments/${rescheduleModal.appointment.id}/reschedule`,
                {
                    appointmentDate: rescheduleData.date,
                    appointmentTime: rescheduleData.time
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Appointment rescheduled successfully!');
            setRescheduleModal({ show: false, appointment: null });
            fetchAppointments();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reschedule appointment');
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

    const totalPages = Math.ceil(totalAppointments / itemsPerPage);

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
                        onChange={(e) => {
                            setFilterStatus(e.target.value);
                            setCurrentPage(1);
                        }}
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
                            <th>ID</th>
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
                                <td colSpan="9" className={styles.noData}>
                                    No appointments found.
                                </td>
                            </tr>
                        ) : (
                            appointments.map(appointment => (
                                <tr key={appointment.id}>
                                    <td><strong>#{appointment.id}</strong></td>
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
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                                                        className={styles.cancelBtn}
                                                        title="Cancel"
                                                    >
                                                        ✕
                                                    </button>
                                                    <button
                                                        onClick={() => handleRescheduleClick(appointment)}
                                                        className={styles.rescheduleBtn}
                                                        title="Reschedule"
                                                    >
                                                        📅
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className={styles.pagination}>
                <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={styles.paginationBtn}
                >
                    Previous
                </button>
                <span className={styles.pageInfo}>
                    Page {currentPage} of {totalPages || 1} ({totalAppointments} total)
                </span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages || totalPages <= 1}
                    className={styles.paginationBtn}
                >
                    Next
                </button>
            </div>

            {/* Reschedule Modal */}
            {rescheduleModal.show && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Reschedule Appointment</h2>
                        <p><strong>Patient:</strong> {rescheduleModal.appointment.patient_name}</p>
                        <p><strong>Doctor:</strong> {rescheduleModal.appointment.doctor_name}</p>
                        <p><strong>Current Date:</strong> {formatDate(rescheduleModal.appointment.appointment_date)}</p>
                        <p><strong>Current Time:</strong> {formatTime(rescheduleModal.appointment.appointment_time)}</p>

                        <div className={styles.formGroup}>
                            <label>New Date:</label>
                            <DatePicker
                                selected={rescheduleData.date ? new Date(rescheduleData.date) : null}
                                onChange={handleDateChange}
                                filterDate={filterDate}
                                minDate={new Date()}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select new date"
                                className={styles.input}
                            />
                        </div>

                        {loadingSlots && <p>Loading available slots...</p>}

                        {rescheduleData.date && availableSlots.length > 0 && (
                            <div className={styles.formGroup}>
                                <label>Available Time Slots:</label>
                                <select
                                    value={rescheduleData.time}
                                    onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                                    className={styles.input}
                                >
                                    <option value="">Select a time slot</option>
                                    {availableSlots.map(slot => (
                                        <option key={slot} value={slot}>
                                            {formatTime(slot)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {rescheduleData.date && availableSlots.length === 0 && !loadingSlots && (
                            <p className={styles.error}>No available slots for this date</p>
                        )}

                        <div className={styles.modalActions}>
                            <button
                                onClick={handleRescheduleSubmit}
                                className={styles.confirmBtn}
                                disabled={!rescheduleData.date || !rescheduleData.time}
                            >
                                Confirm Reschedule
                            </button>
                            <button
                                onClick={() => setRescheduleModal({ show: false, appointment: null })}
                                className={styles.cancelBtn}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentsManagement;
