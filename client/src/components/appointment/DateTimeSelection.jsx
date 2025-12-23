import React, { useState, useEffect } from 'react';
import { fetchAvailableSlots } from '../../utils/api';
import styles from '../../styles/appointment/DateTimeSelection.module.css';

const DateTimeSelection = ({ doctorId, selectedDate, selectedTime, onSelectDate, onSelectTime }) => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [workingHours, setWorkingHours] = useState(null);

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (selectedDate && doctorId) {
            loadAvailableSlots();
        }
    }, [selectedDate, doctorId]);

    const loadAvailableSlots = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAvailableSlots(doctorId, selectedDate);
            setAvailableSlots(data.availableSlots || []);
            setWorkingHours(data.workingHours);
        } catch (err) {
            setError(err.message);
            setAvailableSlots([]);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className={styles.dateTimeContainer}>
            <label htmlFor="appointmentDate">
                <strong>Select Date:</strong>
            </label>
            <input
                type="date"
                id="appointmentDate"
                className={styles.dateInput}
                value={selectedDate}
                onChange={(e) => onSelectDate(e.target.value)}
                min={today}
            />

            {selectedDate && (
                <>
                    {workingHours && (
                        <div className={styles.workingHoursInfo}>
                            <strong>Working Hours:</strong> {formatTime(workingHours.start)} - {formatTime(workingHours.end)}
                        </div>
                    )}

                    {loading && <p className={styles.noSlots}>Loading available slots...</p>}

                    {error && <p className={styles.noSlots}>{error}</p>}

                    {!loading && !error && availableSlots.length === 0 && (
                        <div className={styles.noSlots}>
                            <p>No available slots for this date.</p>
                            <p>Please select another date.</p>
                        </div>
                    )}

                    {!loading && !error && availableSlots.length > 0 && (
                        <>
                            <label><strong>Select Time Slot:</strong></label>
                            <div className={styles.timeSlotGrid}>
                                {availableSlots.map((slot) => (
                                    <div
                                        key={slot}
                                        className={`${styles.timeSlot} ${selectedTime === slot ? styles.selected : ''}`}
                                        onClick={() => onSelectTime(slot)}
                                    >
                                        {formatTime(slot)}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default DateTimeSelection;
