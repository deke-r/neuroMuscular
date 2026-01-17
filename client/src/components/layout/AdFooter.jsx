import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import styles from '../../styles/layout/AdFooter.module.css';

const AdFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-12 text-center mb-4">
                        <img src="/img/logo.png" alt="MusculoNeuroRehab" className={styles.logo} />
                        <p className={styles.tagline}>
                            Restoring Movement, Renewing Life
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="https://www.facebook.com/musculoneurorehab" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <FaFacebookF />
                            </a>
                            <a href="https://x.com/musculoneuro" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <FaTwitter />
                            </a>
                            <a href="https://www.instagram.com/musculoneurorehab/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <FaInstagram />
                            </a>
                            <a href="https://www.linkedin.com/in/musculoneuro-rehab-physiotherapy-centre-b221543a2/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    <div className="col-md-4 text-center">
                        <div className={styles.contactItem}>
                            <div className={styles.iconBox}>
                                <FaMapMarkerAlt />
                            </div>
                            <h3>Visit Us</h3>
                            <p>Plot number 114 Ground floor, Pocket 1 Jasola,<br />Near DAV school opposite Police park,<br />New Delhi, Delhi, 110025</p>
                        </div>
                    </div>

                    <div className="col-md-4 text-center">
                        <div className={styles.contactItem}>
                            <div className={styles.iconBox}>
                                <FaPhoneAlt />
                            </div>
                            <h3>Call Us</h3>
                            <p>
                                <a href="tel:+918882270509">+91 8882270509</a>
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 text-center">
                        <div className={styles.contactItem}>
                            <div className={styles.iconBox}>
                                <FaEnvelope />
                            </div>
                            <h3>Email Us</h3>
                            <p>
                                <a href="mailto:info@musculoneurorehab.com">info@musculoneurorehab.com</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <p>&copy; {new Date().getFullYear()} MusculoNeuroRehab. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default AdFooter;
