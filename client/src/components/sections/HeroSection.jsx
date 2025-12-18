import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import styles from './HeroSection.module.css';

const HeroSection = ({ title, subtitle, ctaText, ctaLink, backgroundImage, features }) => {
    const heroStyle = backgroundImage
        ? { backgroundImage: `url(${backgroundImage})` }
        : {};

    return (
        <section className={styles.hero} style={heroStyle}>
            <div className={styles.overlay}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className={styles.content}>
                                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                                {title && <h1 className={styles.title}>{title}</h1>}
                                {ctaText && ctaLink && (
                                    <Link to={ctaLink} className={styles.ctaButton}>
                                        {ctaText}
                                        <FaArrowRight className={styles.ctaIcon} />
                                    </Link>
                                )}
                                {features && features.length > 0 && (
                                    <div className={styles.features}>
                                        {features.map((feature, index) => (
                                            <div key={index} className={styles.feature}>
                                                {feature.icon && <feature.icon className={styles.featureIcon} />}
                                                <span>{feature.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
