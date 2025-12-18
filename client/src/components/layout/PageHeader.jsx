import React from 'react';
import Breadcrumbs from '../common/Breadcrumbs';
import styles from './PageHeader.module.css';

const PageHeader = ({ title, subtitle, breadcrumbs, backgroundImage }) => {
    const headerStyle = backgroundImage
        ? { backgroundImage: `url(${backgroundImage})` }
        : {};

    return (
        <div className={styles.pageHeader} style={headerStyle}>
            <div className={styles.overlay}>
                <div className="container">
                    <div className={styles.content}>
                        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
                        {title && <h1 className={styles.title}>{title}</h1>}
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
