import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import styles from '../../styles/components/AppointmentModal.module.css';

const AppointmentModal = ({ show, onClose, children }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            size="lg"
            className={styles.appointmentModal}
            backdrop="static"
            keyboard={true}
        >
            <Modal.Header className={styles.modalHeader}>
                <Modal.Title className={styles.modalTitle}>
                    Book Your Appointment
                </Modal.Title>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close"
                >
                    <FaTimes />
                </button>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                {children}
            </Modal.Body>
        </Modal>
    );
};

export default AppointmentModal;
