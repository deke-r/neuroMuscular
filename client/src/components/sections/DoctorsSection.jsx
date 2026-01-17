import React from 'react';
import SectionHeader from '../common/SectionHeader';
import DoctorCard from '../cards/DoctorCard';
import styles from '../../styles/sections/DoctorsSection.module.css';

const DoctorsSection = ({ title, subtitle, doctors, onDoctorClick }) => {
    return (
        <section className={`${styles.doctorsSection} section-padding`}>
            <div className="container">
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    align="center"
                />
                <div className="row g-4 justify-content-center">
                    {doctors && doctors.map((doctor) => (
                        <div key={doctor.id} className="col-lg-4 col-md-6">
                            <DoctorCard {...doctor} onClick={() => onDoctorClick && onDoctorClick(doctor)} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DoctorsSection;
