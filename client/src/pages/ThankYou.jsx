import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import styles from '../styles/ThankYou.module.css';

const ThankYou = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Auto redirect to home after 10 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.thankYouContainer}>
            <div className={styles.thankYouCard}>
                <div className={styles.iconWrapper}>
                    <CheckCircle className={styles.successIcon} size={80} />
                </div>

                <h1 className={styles.title}>Thank You!</h1>

                <p className={styles.message}>
                    Your message has been successfully submitted.
                </p>

                <p className={styles.subMessage}>
                    We appreciate you contacting MuscloNeuro Rehab. Our team will review your message and get back to you within 24-48 hours.
                </p>

                <div className={styles.infoBox}>
                    <p className={styles.infoText}>
                        <strong>What happens next?</strong>
                    </p>
                    <ul className={styles.infoList}>
                        <li>Our team will review your inquiry</li>
                        <li>You'll receive a confirmation email shortly</li>
                        <li>We'll respond within 24-48 business hours</li>
                    </ul>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.primaryButton}
                        onClick={() => navigate('/')}
                    >
                        Return to Home
                    </button>

                    <button
                        className={styles.secondaryButton}
                        onClick={() => navigate('/book-appointment')}
                    >
                        Book an Appointment
                    </button>
                </div>

                <p className={styles.redirectText}>
                    You will be automatically redirected to the home page in 10 seconds...
                </p>
            </div>
        </div>
    );
};

export default ThankYou;
