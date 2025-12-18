import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import styles from './CTASection.module.css';

const CTASection = ({ title, description, buttonText, buttonLink, variant = 'primary' }) => {
    return (
        <section className={`${styles.ctaSection} ${styles[variant]}`}>
            <div className="container">
                <div className={styles.content}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {description && <p className={styles.description}>{description}</p>}
                    {buttonText && buttonLink && (
                        <Link to={buttonLink} className={styles.ctaButton}>
                            {buttonText}
                            <FaArrowRight className={styles.icon} />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CTASection;
