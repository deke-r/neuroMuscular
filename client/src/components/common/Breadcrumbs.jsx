import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import styles from '../../styles/common/Breadcrumbs.module.css';

const Breadcrumbs = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <nav className={styles.breadcrumbs} aria-label="breadcrumb">
            <ol className={styles.list}>
                {items.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {index < items.length - 1 ? (
                            <>
                                <Link to={item.path} className={styles.link}>
                                    {item.label}
                                </Link>
                                <FaChevronRight className={styles.separator} />
                            </>
                        ) : (
                            <span className={styles.active}>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
