import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/cards/ConditionCard.module.css';

const ConditionCard = ({ title, description, icon: Icon, link = '#' }) => {
    return (
        <Link to={link} className={styles.conditionCard}>
            <div className={styles.iconWrapper}>
                {Icon && <Icon className={styles.icon} />}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <span className={styles.learnMore}>Learn More →</span>
            </div>
        </Link>
    );
};

export default ConditionCard;
