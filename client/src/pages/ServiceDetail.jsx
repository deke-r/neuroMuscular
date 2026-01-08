import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaCalendarAlt } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import { services } from '../data/services.data';
import styles from '../styles/pages/ServiceDetail.module.css';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const service = services.find(s => s.id === parseInt(serviceId));

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    const Icon = service.icon;

    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Services', path: '/services' },
        { label: service.title, path: `/services/${service.id}` }
    ];

    return (
        <>
            <PageHelmet
                title={`${service.title} | NeuroMusculoRehab`}
                description={service.description}
                keywords={`${service.title}, rehabilitation, therapy, NeuroMusculoRehab`}
                canonicalUrl={`https://musculoneurorehab.in/services/${service.id}`}
            />

            <PageHeader
                title={service.title}
                subtitle={service.description}
                breadcrumbs={breadcrumbs}
                backgroundImage={service.image}
            />

            <section className={styles.serviceDetail}>
                <div className="container">
                    <div className={styles.backLink}>
                        <Link to="/services" className={styles.backButton}>
                            <FaArrowLeft /> Back to Services
                        </Link>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.mainContent}>
                            <div className={styles.iconHeader}>
                                <div className={styles.iconWrapper}>
                                    <Icon className={styles.icon} />
                                </div>
                                <div>
                                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                                    <p className={styles.serviceDescription}>{service.description}</p>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>What We Offer</h3>
                                <p className={styles.sectionText}>
                                    Our {service.title.toLowerCase()} program is designed to provide comprehensive care
                                    tailored to each patient's unique needs. We utilize evidence-based practices and
                                    state-of-the-art equipment to ensure the best possible outcomes.
                                </p>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Key Features & Benefits</h3>
                                <ul className={styles.featuresList}>
                                    {service.features.map((feature, index) => (
                                        <li key={index} className={styles.featureItem}>
                                            <FaCheck className={styles.checkIcon} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Our Approach</h3>
                                <p className={styles.sectionText}>
                                    We believe in a patient-centered approach that focuses on your individual goals and needs.
                                    Our experienced team of specialists works collaboratively to create personalized treatment
                                    plans that maximize your recovery and improve your quality of life.
                                </p>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Who Can Benefit?</h3>
                                <p className={styles.sectionText}>
                                    This service is ideal for individuals recovering from injuries, managing chronic conditions,
                                    or seeking to improve their physical function and independence. Our team will assess your
                                    specific needs and develop a customized treatment plan to help you achieve your goals.
                                </p>
                            </div>
                        </div>

                        <div className={styles.sidebar}>
                            <div className={styles.ctaCard}>
                                <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
                                <p className={styles.ctaText}>
                                    Book an appointment with our specialists today and take the first step towards recovery.
                                </p>
                                <Link to="/book-appointment" className={styles.ctaButton}>
                                    <FaCalendarAlt />
                                    Book Appointment
                                </Link>
                            </div>

                            <div className={styles.infoCard}>
                                <h4 className={styles.infoTitle}>Need More Information?</h4>
                                <p className={styles.infoText}>
                                    Our team is here to answer any questions you may have about our services.
                                </p>
                                <Link to="/contact" className={styles.contactLink}>
                                    Contact Us
                                </Link>
                            </div>

                            <div className={styles.relatedServices}>
                                <h4 className={styles.relatedTitle}>Other Services</h4>
                                <ul className={styles.relatedList}>
                                    {services
                                        .filter(s => s.id !== service.id)
                                        .slice(0, 3)
                                        .map(relatedService => {
                                            const RelatedIcon = relatedService.icon;
                                            return (
                                                <li key={relatedService.id} className={styles.relatedItem}>
                                                    <Link to={`/services/${relatedService.id}`} className={styles.relatedLink}>
                                                        <RelatedIcon className={styles.relatedIcon} />
                                                        <span>{relatedService.title}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceDetail;
