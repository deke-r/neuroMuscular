import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from '../../styles/components/AppointmentModal.module.css';

const AppointmentModal = ({ show, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
            // Small timeout to allow render before adding 'show' class for animation
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            // Wait for animation to finish before hiding
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'unset';
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!isVisible && !show) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`modal-backdrop fade ${isAnimating ? 'show' : ''}`}
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div
                className={`modal fade ${isAnimating ? 'show' : ''}`}
                style={{ display: 'block' }}
                tabIndex="-1"
                role="dialog"
                aria-hidden={!show}
            >
                <div className={`modal-dialog modal-dialog-centered modal-lg ${styles.modalDialog}`} role="document">
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.modalTitle}>Book Your Appointment</h5>
                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={onClose}
                                aria-label="Close"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentModal;
