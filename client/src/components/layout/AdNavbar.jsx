import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import styles from '../../styles/layout/AdNavbar.module.css';

const AdNavbar = () => {
    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${styles.navbar}`}>
            <div className="container">
                <div className={styles.logoContainer}>
                    <img src="/img/logo.png" alt="MusculoNeuroRehab" className={styles.logo} />
                </div>

                <div className={styles.contactInfo}>
                    <Link to="/book-appointment" className={styles.bookButton}>
                        Book Appointment
                    </Link>

                    <a href="tel:+918882270509" className={styles.phoneLink}>
                        <div className={styles.iconBox}>
                            <FaPhoneAlt />
                        </div>
                        <div className={styles.textContainer}>
                            <span className={styles.label}>Call Us Now</span>
                            <span className={styles.number}>+91 8882270509</span>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default AdNavbar;
