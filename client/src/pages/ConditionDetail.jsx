import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaCalendarAlt, FaExclamationTriangle, FaStethoscope, FaHeartbeat, FaClock } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import { conditions } from '../data/conditions.data';
import styles from '../styles/pages/ServiceDetail.module.css';

const ConditionDetail = () => {
    const { conditionId } = useParams();
    const condition = conditions.find(c => c.slug === conditionId);

    if (!condition) {
        return <Navigate to="/conditions" replace />;
    }

    const Icon = condition.icon;

    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Conditions', path: '/conditions' },
        { label: condition.title, path: `/conditions/${condition.slug}` }
    ];

    return (
        <>
            <PageHelmet
                title={`${condition.title} Treatment | PMR Hospital`}
                description={`Expert rehabilitation and treatment for ${condition.title}. ${condition.description}`}
                keywords={`${condition.title}, ${condition.title} treatment, ${condition.title} rehabilitation, physiotherapy, PMR Hospital`}
                canonicalUrl={`https://pmrhospital.com/conditions/${condition.slug}`}
            />

            <PageHeader
                title={condition.title}
                subtitle={condition.description}
                breadcrumbs={breadcrumbs}
                backgroundImage={condition.image}
            />

            <section className={styles.serviceDetail}>
                <div className="container">
                    <div className={styles.backLink}>
                        <Link to="/conditions" className={styles.backButton}>
                            <FaArrowLeft /> Back to Conditions
                        </Link>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.mainContent}>
                            <div className={styles.iconHeader}>
                                <div className={styles.iconWrapper}>
                                    <Icon className={styles.icon} />
                                </div>
                                <div>
                                    <h2 className={styles.serviceTitle}>{condition.title}</h2>
                                    <p className={styles.serviceDescription}>{condition.description}</p>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Overview</h3>
                                <p className={styles.sectionText}>
                                    {condition.overview}
                                </p>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>
                                    <FaExclamationTriangle style={{ marginRight: '10px', color: 'var(--color-primary)' }} />
                                    Common Symptoms
                                </h3>
                                <ul className={styles.featuresList}>
                                    {condition.symptoms.map((symptom, index) => (
                                        <li key={index} className={styles.featureItem}>
                                            <FaCheck className={styles.checkIcon} />
                                            <span>{symptom}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>
                                    <FaStethoscope style={{ marginRight: '10px', color: 'var(--color-primary)' }} />
                                    Our Treatment Approach
                                </h3>
                                <p className={styles.sectionText}>
                                    Our comprehensive rehabilitation program for {condition.title.toLowerCase()} includes:
                                </p>
                                <ul className={styles.featuresList}>
                                    {condition.treatments.map((treatment, index) => (
                                        <li key={index} className={styles.featureItem}>
                                            <FaCheck className={styles.checkIcon} />
                                            <span>{treatment}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>
                                    <FaHeartbeat style={{ marginRight: '10px', color: 'var(--color-primary)' }} />
                                    Causes & Risk Factors
                                </h3>
                                <ul className={styles.featuresList}>
                                    {condition.causes.map((cause, index) => (
                                        <li key={index} className={styles.featureItem}>
                                            <FaCheck className={styles.checkIcon} />
                                            <span>{cause}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>
                                    <FaClock style={{ marginRight: '10px', color: 'var(--color-primary)' }} />
                                    Recovery & Prognosis
                                </h3>
                                <p className={styles.sectionText}>
                                    {condition.recovery}
                                </p>
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Why Choose PMR Hospital?</h3>
                                <p className={styles.sectionText}>
                                    Our expert physiotherapists specialize in treating {condition.title.toLowerCase()} using evidence-based
                                    techniques and personalized treatment plans. We focus on maximizing your recovery potential and
                                    helping you achieve your rehabilitation goals in a supportive, professional environment.
                                </p>
                            </div>
                        </div>

                        <div className={styles.sidebar}>
                            <div className={styles.ctaCard}>
                                <h3 className={styles.ctaTitle}>Ready to Start Your Recovery?</h3>
                                <p className={styles.ctaText}>
                                    Book an appointment with our specialists today and take the first step towards better health.
                                </p>
                                <Link to="/book-appointment" className={styles.ctaButton}>
                                    <FaCalendarAlt />
                                    Book Appointment
                                </Link>
                            </div>

                            <div className={styles.infoCard}>
                                <h4 className={styles.infoTitle}>Have Questions?</h4>
                                <p className={styles.infoText}>
                                    Our team is here to answer any questions about treatment options and rehabilitation programs.
                                </p>
                                <Link to="/contact" className={styles.contactLink}>
                                    Contact Us
                                </Link>
                            </div>

                            <div className={styles.relatedServices}>
                                <h4 className={styles.relatedTitle}>Other Conditions We Treat</h4>
                                <ul className={styles.relatedList}>
                                    {conditions
                                        .filter(c => c.id !== condition.id)
                                        .slice(0, 4)
                                        .map(relatedCondition => {
                                            const RelatedIcon = relatedCondition.icon;
                                            return (
                                                <li key={relatedCondition.id} className={styles.relatedItem}>
                                                    <Link to={`/conditions/${relatedCondition.slug}`} className={styles.relatedLink}>
                                                        <RelatedIcon className={styles.relatedIcon} />
                                                        <span>{relatedCondition.title}</span>
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

export default ConditionDetail;
