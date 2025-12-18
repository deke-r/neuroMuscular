import React from 'react';
import styles from '../../styles/common/SectionHeader.module.css';

const SectionHeader = ({ title, subtitle, description, align = 'center' }) => {
    return (
        <div className={`${styles.sectionHeader} ${styles[align]}`}>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
        </div>
    );
};

export default SectionHeader;
