import React from 'react';
import styles from '../../styles/cards/DoctorCard.module.css';

const DoctorCard = ({ name, designation, specialization, experience, image, qualifications }) => {
    return (
        <div className={styles.doctorCard}>
            <div className={styles.imageWrapper}>
                <img
                    src={image}
                    alt={name}
                    className={styles.image}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x350/0C4379/FFFFFF?text=Doctor';
                    }}
                />
                <div className={styles.overlay}>
                    <span className={styles.experience}>{experience} Experience</span>
                </div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.designation}>{designation}</p>
                <p className={styles.specialization}>{specialization}</p>
                {qualifications && qualifications.length > 0 && (
                    <ul className={styles.qualifications}>
                        {qualifications.map((qual, index) => (
                            <li key={index} className={styles.qualification}>
                                {qual}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DoctorCard;
