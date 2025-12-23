import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/appointment/BookingConfirmation.module.css';

const BookingConfirmation = ({ appointmentDetails }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className={styles.confirmationContainer}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.confirmationTitle}>Appointment Confirmed!</h2>
            <p className={styles.confirmationMessage}>
                Your appointment has been successfully booked. A confirmation email has been sent to your registered email address.
            </p>

            <div className={styles.appointmentSummary}>
                <h3 className={styles.summaryTitle}>Appointment Details</h3>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Doctor:</span>
                    <span className={styles.summaryValue}>{appointmentDetails.doctorName}</span>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Service:</span>
                    <span className={styles.summaryValue}>{appointmentDetails.serviceName}</span>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Date:</span>
                    <span className={styles.summaryValue}>{formatDate(appointmentDetails.appointmentDate)}</span>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Time:</span>
                    <span className={styles.summaryValue}>{formatTime(appointmentDetails.appointmentTime)}</span>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Patient Name:</span>
                    <span className={styles.summaryValue}>{appointmentDetails.patientName}</span>
                </div>

                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Contact:</span>
                    <span className={styles.summaryValue}>{appointmentDetails.patientPhone}</span>
                </div>
            </div>

            <div className={styles.actionButtons}>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/')}
                >
                    Go to Home
                </button>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => window.location.reload()}
                >
                    Book Another Appointment
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmation;
