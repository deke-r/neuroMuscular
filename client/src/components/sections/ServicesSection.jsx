import React from 'react';
import SectionHeader from '../common/SectionHeader';
import ServiceCard from '../cards/ServiceCard';
import styles from '../../styles/sections/ServicesSection.module.css';

const ServicesSection = ({ title, subtitle, services }) => {
    return (
        <section className={`${styles.servicesSection} section-padding`}>
            <div className="container">
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    align="center"
                />
                <div className="row g-4">
                    {services && services.map((service) => (
                        <div key={service.id} className="col-lg-6 col-md-6">
                            <ServiceCard {...service} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
