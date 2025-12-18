import React from 'react';
import styles from '../../styles/common/StatsBox.module.css';

const StatsBox = ({ number, label, icon: Icon, suffix = '' }) => {
    return (
        <div className={styles.statsBox}>
            {Icon && <Icon className={styles.icon} />}
            <div className={styles.content}>
                <div className={styles.number}>
                    {number}{suffix}
                </div>
                <div className={styles.label}>{label}</div>
            </div>
        </div>
    );
};

export default StatsBox;
