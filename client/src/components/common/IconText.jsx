import React from 'react';
import styles from '../../styles/common/IconText.module.css';

const IconText = ({ icon: Icon, text, variant = 'horizontal' }) => {
    return (
        <div className={`${styles.iconText} ${styles[variant]}`}>
            {Icon && <Icon className={styles.icon} />}
            <span className={styles.text}>{text}</span>
        </div>
    );
};

export default IconText;
