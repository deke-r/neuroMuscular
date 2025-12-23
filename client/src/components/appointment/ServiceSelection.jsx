import React from 'react';
import styles from '../../styles/appointment/ServiceSelection.module.css';

const ServiceSelection = ({ services, selectedService, onSelectService }) => {
    if (!services || services.length === 0) {
        return (
            <div className={styles.noServices}>
                <p>No services available for this doctor.</p>
            </div>
        );
    }

    return (
        <div className={styles.serviceGrid}>
            {services.map((service) => (
                <div
                    key={service.id}
                    className={`${styles.serviceCard} ${selectedService?.id === service.id ? styles.selected : ''}`}
                    onClick={() => onSelectService(service)}
                >
                    <h3 className={styles.serviceName}>{service.service_name}</h3>
                    {service.service_description && (
                        <p className={styles.serviceDescription}>{service.service_description}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ServiceSelection;
