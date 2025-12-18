import React from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from '../../styles/cards/PackageCard.module.css';

const PackageCard = ({ name, price, duration, features, popular, onSelect }) => {
    return (
        <div className={`${styles.packageCard} ${popular ? styles.popular : ''}`}>
            {popular && <div className={styles.badge}>Most Popular</div>}
            <div className={styles.header}>
                <h3 className={styles.name}>{name}</h3>
                <div className={styles.price}>{price}</div>
                <p className={styles.duration}>{duration}</p>
            </div>
            <div className={styles.content}>
                {features && features.length > 0 && (
                    <ul className={styles.featuresList}>
                        {features.map((feature, index) => (
                            <li key={index} className={styles.feature}>
                                <FaCheck className={styles.checkIcon} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className={styles.footer}>
                <button
                    className={styles.selectButton}
                    onClick={onSelect}
                >
                    Select Package
                </button>
            </div>
        </div>
    );
};

export default PackageCard;
