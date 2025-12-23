import React from 'react';
import styles from '../../styles/appointment/DoctorSelection.module.css';

const DoctorSelection = ({ doctors, selectedDoctor, onSelectDoctor }) => {
    return (
        <div className={styles.doctorGrid}>
            {doctors.map((doctor) => {
                // Construct full image URL
                const imageUrl = doctor.image_url
                    ? `${import.meta.env.VITE_API_URL}${doctor.image_url}`
                    : 'https://via.placeholder.com/300x350/0C4379/FFFFFF?text=Doctor';

                return (
                    <div
                        key={doctor.id}
                        className={`${styles.doctorCard} ${selectedDoctor?.id === doctor.id ? styles.selected : ''}`}
                        onClick={() => onSelectDoctor(doctor)}
                    >
                        <img
                            src={imageUrl}
                            alt={doctor.name}
                            className={styles.doctorImage}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x350/0C4379/FFFFFF?text=Doctor';
                            }}
                        />
                        <div className={styles.doctorInfo}>
                            <h3 className={styles.doctorName}>{doctor.name}</h3>
                            <p className={styles.doctorDesignation}>{doctor.designation}</p>
                            <p className={styles.doctorSpecialization}>{doctor.specialization}</p>
                            <p className={styles.doctorExperience}>{doctor.experience} Experience</p>
                            {doctor.description && (
                                <p className={styles.doctorDescription}>{doctor.description}</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DoctorSelection;
