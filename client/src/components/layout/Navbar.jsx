import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from '../../styles/layout/Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/conditions', label: 'Conditions' },
        { path: '/doctors', label: 'Doctors' },
        // { path: '/packages', label: 'Packages' },
        // { path: '/infrastructure', label: 'Infrastructure' },
        // { path: '/blog', label: 'Blog' },
        { path: '/contact', label: 'Contact' }
    ];

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <div className={styles.topBar}>
                <div className="container">
                    <div className={styles.topBarContent}>
                        <div className={styles.contactInfo}>
                            <a href="tel:+918882270509" className={styles.contactLink}>
                                <FaPhone className={styles.contactIcon} />
                                <span>+91 8882270509</span>
                            </a>
                            <a href="mailto:info@muscloneurorehab.com" className={styles.contactLink}>
                                <FaEnvelope className={styles.contactIcon} />
                                <span>info@muscloneurorehab.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <nav className={styles.navbar}>
                <div className="container">
                    <div className={styles.navContent}>
                        <Link to="/" className={styles.logo} onClick={closeMenu}>
                            <img src="/img/logo.png" alt="MuscloNeuroRehab" className={styles.logoImage} />
                        </Link>

                        <button
                            className={styles.menuToggle}
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>

                        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
                            <button
                                className={styles.mobileCloseBtn}
                                onClick={closeMenu}
                                aria-label="Close menu"
                            >
                                <FaTimes />
                            </button>
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                                    }
                                    onClick={closeMenu}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <Link to="/book-appointment" className={styles.ctaButton} onClick={closeMenu}>
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
