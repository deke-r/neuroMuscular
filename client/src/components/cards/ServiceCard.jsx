import React from 'react';
import { Link } from 'react-router-dom';
import { FaHospital } from 'react-icons/fa';
import styles from '../../styles/cards/ServiceCard.module.css';

const ServiceCard = ({
    id,
    title,
    service_name,
    description,
    service_description,
    icon: Icon,
    image,
    features
}) => {
    // Handle both hardcoded data (title) and API data (service_name)
    const displayTitle = title || service_name;
    const displayDescription = description || service_description;
    const DisplayIcon = Icon || FaHospital;

    return (
        <Link to={`/services/${id}`} className={styles.serviceCard}>
            {image && (
                <div className={styles.imageWrapper}>
                    <img src={image} alt={displayTitle} className={styles.image} />
                    <div className={styles.imageOverlay}></div>
                </div>
            )}
            <div className={styles.iconWrapper}>
                <DisplayIcon className={styles.icon} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{displayTitle}</h3>
                <p className={styles.description}>{displayDescription}</p>
                {features && features.length > 0 && (
                    <ul className={styles.featuresList}>
                        {features.slice(0, 3).map((feature, index) => (
                            <li key={index} className={styles.feature}>
                                {feature}
                            </li>
                        ))}
                    </ul>
                )}
                <span className={styles.learnMore}>Learn More →</span>
            </div>
        </Link>
    );
};

export default ServiceCard;
