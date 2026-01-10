import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from '../../styles/layout/Footer.module.css';

const Footer = () => {
    const quickLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Us' },
        { path: '/services', label: 'Services' },
        { path: '/doctors', label: 'Our Doctors' },
        // { path: '/packages', label: 'Packages' },
        { path: '/contact', label: 'Contact' }
    ];

    const services = [
        { path: '/services', label: 'Core Musculoskeletal Services' },
        { path: '/services', label: 'Neurology and Balance Services' },
        { path: '/services', label: 'Pain and Electrotherapy Services' },
        { path: '/services', label: 'Sports, Spine, and Lifestyle Services' }
    ];

    const contactInfo = {
        address: 'Plot number 114 Ground floor, Pocket 1 Jasola, Near DAV school opposite Police park, New Delhi, Delhi - 110025',
        phone: '+91 8882270509',
        email: 'info@musculoneurorehab.com'
    };

    const socialLinks = [
        { icon: FaFacebookF, url: 'https://www.facebook.com/musculoneurorehab', label: 'Facebook' },
        { icon: FaTwitter, url: 'https://x.com/musculoneuro', label: 'Twitter' },
        { icon: FaInstagram, url: 'https://www.instagram.com/musculoneurorehab/', label: 'Instagram' },
        { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/musculoneuro-rehab-physiotherapy-centre-b221543a2/', label: 'LinkedIn' }
    ];

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>MusculoNeuro Rehab Physiotherapy Centre</h3>
                            <p className={styles.footerDescription}>
                                Professional rehabilitation center providing comprehensive care for neurological and musculoskeletal conditions.
                                Our expert team is dedicated to helping you regain independence and improve quality of life.
                            </p>
                            <div className={styles.socialLinks}>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        aria-label={social.label}
                                    >
                                        <social.icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <div className={styles.footerSection}>
                            <h4 className={styles.sectionTitle}>Quick Links</h4>
                            <ul className={styles.linkList}>
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.path} className={styles.footerLink}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className={styles.footerSection}>
                            <h4 className={styles.sectionTitle}>Our Services</h4>
                            <ul className={styles.linkList}>
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <Link to={service.path} className={styles.footerLink}>
                                            {service.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className={styles.footerSection}>
                            <h4 className={styles.sectionTitle}>Contact Info</h4>
                            <ul className={styles.contactList}>
                                <li className={styles.contactItem}>
                                    <FaMapMarkerAlt className={styles.contactIcon} />
                                    <span>{contactInfo.address}</span>
                                </li>
                                <li className={styles.contactItem}>
                                    <FaPhone className={styles.contactIcon} />
                                    <a href={`tel:${contactInfo.phone}`} className={styles.contactLink}>
                                        {contactInfo.phone}
                                    </a>
                                </li>
                                <li className={styles.contactItem}>
                                    <FaEnvelope className={styles.contactIcon} />
                                    <a href={`mailto:${contactInfo.email}`} className={styles.contactLink}>
                                        {contactInfo.email}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} MusculoNeuro Rehab. All rights reserved.
                    </p>
                    <div className={styles.footerBottomLinks}>
                        <Link to="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
                        <span className={styles.separator}>|</span>
                        <Link to="/terms" className={styles.bottomLink}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
