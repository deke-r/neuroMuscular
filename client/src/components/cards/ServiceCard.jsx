import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/cards/ServiceCard.module.css';

const ServiceCard = ({ id, title, description, icon: Icon, image, features }) => {
    return (
        <Link to={`/services/${id}`} className={styles.serviceCard}>
            <div className={styles.iconWrapper}>
                {Icon && <Icon className={styles.icon} />}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
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
