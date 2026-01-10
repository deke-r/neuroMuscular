import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/admin/Management.module.css';

const WorkingHoursManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [workingHours, setWorkingHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const defaultWorkingHour = {
        day_of_week: '',
        start_time: '09:00',
        end_time: '17:00',
        is_available: true
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (selectedDoctor) {
            fetchWorkingHours(selectedDoctor.id);
        }
    }, [selectedDoctor]);

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

    const fetchWorkingHours = async (doctorId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/working-hours/doctor/${doctorId}`
            );
            const hours = response.data.data || [];

            // Create a map of existing hours by day
            const hoursMap = {};
            hours.forEach(h => {
                hoursMap[h.day_of_week] = {
                    id: h.id,
                    day_of_week: h.day_of_week,
                    start_time: h.start_time.substring(0, 5), // HH:MM format
                    end_time: h.end_time.substring(0, 5),
                    is_available: Boolean(h.is_available)
                };
            });

            // Create full week schedule
            const fullSchedule = daysOfWeek.map(day => {
                if (hoursMap[day]) {
                    return hoursMap[day];
                }
                return {
                    day_of_week: day,
                    start_time: '09:00',
                    end_time: '17:00',
                    is_available: false
                };
            });

            setWorkingHours(fullSchedule);
        } catch (err) {
            setError('Failed to fetch working hours');
        }
    };

    const handleDoctorChange = (e) => {
        const doctorId = parseInt(e.target.value);
        const doctor = doctors.find(d => d.id === doctorId);
        setSelectedDoctor(doctor || null);
        setError('');
        setSuccess('');
    };

    const handleTimeChange = (index, field, value) => {
        const newHours = [...workingHours];
        newHours[index] = { ...newHours[index], [field]: value };
        setWorkingHours(newHours);
    };

    const handleAvailabilityToggle = (index) => {
        const newHours = [...workingHours];
        newHours[index] = {
            ...newHours[index],
            is_available: !newHours[index].is_available
        };
        setWorkingHours(newHours);
    };

    const validateTimes = () => {
        for (const hour of workingHours) {
            if (hour.is_available) {
                if (!hour.start_time || !hour.end_time) {
                    return 'Please set both start and end times for all available days';
                }
                if (hour.start_time >= hour.end_time) {
                    return `Invalid time range for ${hour.day_of_week}: start time must be before end time`;
                }
            }
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!selectedDoctor) {
            setError('Please select a doctor');
            return;
        }

        const validationError = validateTimes();
        if (validationError) {
            setError(validationError);
            return;
        }

        setSaving(true);

        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            // Only send available days
            const availableHours = workingHours
                .filter(h => h.is_available)
                .map(h => ({
                    day_of_week: h.day_of_week,
                    start_time: h.start_time,
                    end_time: h.end_time,
                    is_available: true
                }));

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/working-hours/doctor/${selectedDoctor.id}`,
                { workingHours: availableHours },
                { headers }
            );

            setSuccess('Working hours updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update working hours');
        } finally {
            setSaving(false);
        }
    };

    const applyToAllDays = () => {
        if (workingHours.length === 0) return;

        const firstDay = workingHours[0];
        const newHours = workingHours.map(h => ({
            ...h,
            start_time: firstDay.start_time,
            end_time: firstDay.end_time,
            is_available: firstDay.is_available
        }));
        setWorkingHours(newHours);
    };

    const setWeekdaysAvailable = () => {
        const newHours = workingHours.map(h => ({
            ...h,
            is_available: !['Saturday', 'Sunday'].includes(h.day_of_week)
        }));
        setWorkingHours(newHours);
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Doctor Working Hours</h1>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <div className={styles.formCard}>
                <div className={styles.formGroup}>
                    <label>Select Doctor *</label>
                    <select
                        value={selectedDoctor?.id || ''}
                        onChange={handleDoctorChange}
                        className={styles.selectDoctor}
                    >
                        <option value="">-- Select a Doctor --</option>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name} - {doctor.designation}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedDoctor && (
                    <>
                        <div className={styles.quickActions}>
                            <button
                                type="button"
                                onClick={applyToAllDays}
                                className={styles.quickActionBtn}
                            >
                                Apply Monday to All Days
                            </button>
                            <button
                                type="button"
                                onClick={setWeekdaysAvailable}
                                className={styles.quickActionBtn}
                            >
                                Set Weekdays Only
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.scheduleGrid}>
                                {workingHours.map((hour, index) => (
                                    <div
                                        key={hour.day_of_week}
                                        className={`${styles.scheduleRow} ${!hour.is_available ? styles.unavailable : ''}`}
                                    >
                                        <div className={styles.dayColumn}>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={hour.is_available}
                                                    onChange={() => handleAvailabilityToggle(index)}
                                                />
                                                <span className={styles.dayName}>{hour.day_of_week}</span>
                                            </label>
                                        </div>

                                        <div className={styles.timeColumn}>
                                            <div className={styles.timeInputGroup}>
                                                <label>Start Time</label>
                                                <input
                                                    type="time"
                                                    value={hour.start_time}
                                                    onChange={(e) => handleTimeChange(index, 'start_time', e.target.value)}
                                                    disabled={!hour.is_available}
                                                    required={hour.is_available}
                                                />
                                            </div>

                                            <div className={styles.timeInputGroup}>
                                                <label>End Time</label>
                                                <input
                                                    type="time"
                                                    value={hour.end_time}
                                                    onChange={(e) => handleTimeChange(index, 'end_time', e.target.value)}
                                                    disabled={!hour.is_available}
                                                    required={hour.is_available}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.statusColumn}>
                                            <span className={hour.is_available ? styles.statusAvailable : styles.statusUnavailable}>
                                                {hour.is_available ? 'Available' : 'Unavailable'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.formActions}>
                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Save Working Hours'}
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {!selectedDoctor && (
                    <div className={styles.noSelection}>
                        <p>Please select a doctor to manage their working hours</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkingHoursManagement;
