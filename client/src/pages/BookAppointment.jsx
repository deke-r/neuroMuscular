import React from 'react';
import { FaCheckCircle, FaCalendarAlt, FaUserMd } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import AppointmentForm from '../components/forms/AppointmentForm';

const BookAppointment = () => {
    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Book Appointment', path: '/book-appointment' }
    ];

    const benefits = [
        'Comprehensive initial assessment',
        'Personalized treatment plan',
        'Expert multidisciplinary team',
        'State-of-the-art facilities',
        'Flexible appointment scheduling',
        'Insurance assistance available'
    ];

    const steps = [
        {
            icon: FaCalendarAlt,
            title: 'Choose Your Date',
            description: 'Select a convenient date and time for your appointment'
        },
        {
            icon: FaUserMd,
            title: 'Meet Our Expert',
            description: 'Consult with our specialized rehabilitation team'
        },
        {
            icon: FaCheckCircle,
            title: 'Start Your Journey',
            description: 'Begin your personalized rehabilitation program'
        }
    ];

    return (
        <>
            <PageHelmet
                title="Book Appointment - PMR Hospital | Schedule Your Consultation"
                description="Book an appointment with our expert rehabilitation team. Easy online booking for physiotherapy, occupational therapy, speech therapy, and more."
                keywords="book appointment, schedule consultation, rehabilitation appointment, physiotherapy booking, online appointment booking"
                canonicalUrl="https://pmrhospital.com/book-appointment"
            />

            <PageHeader
                title="Book an Appointment"
                subtitle="Take the First Step Towards Your Recovery"
                breadcrumbs={breadcrumbs}
            />

            <section className="section-padding">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-5">
                            <div style={{ position: 'sticky', top: '100px' }}>
                                <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-lg)', color: 'var(--color-gray-800)' }}>
                                    Why Choose PMR Hospital?
                                </h3>
                                <div style={{
                                    background: 'var(--color-white)',
                                    padding: 'var(--spacing-2xl)',
                                    borderRadius: 'var(--radius-xl)',
                                    boxShadow: 'var(--shadow-lg)',
                                    marginBottom: 'var(--spacing-2xl)',
                                    border: '1px solid var(--color-gray-200)'
                                }}>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {benefits.map((benefit, index) => (
                                            <li key={index} style={{
                                                padding: 'var(--spacing-md) 0',
                                                borderBottom: index < benefits.length - 1 ? '1px solid var(--color-gray-200)' : 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--spacing-md)'
                                            }}>
                                                <FaCheckCircle style={{ color: 'var(--color-secondary)', fontSize: 'var(--font-size-lg)', flexShrink: 0 }} />
                                                <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-gray-700)' }}>
                                                    {benefit}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <h4 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-lg)', color: 'var(--color-gray-800)' }}>
                                    How It Works
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                    {steps.map((step, index) => (
                                        <div key={index} style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: 'var(--radius-md)',
                                                background: 'var(--gradient-primary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <step.icon style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-white)' }} />
                                            </div>
                                            <div>
                                                <h5 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-xs)', color: 'var(--color-gray-800)' }}>
                                                    {step.title}
                                                </h5>
                                                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-gray-600)', margin: 0 }}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <AppointmentForm />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding-sm" style={{ background: 'var(--color-light)' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div style={{
                                background: 'var(--color-white)',
                                padding: 'var(--spacing-2xl)',
                                borderRadius: 'var(--radius-xl)',
                                boxShadow: 'var(--shadow-lg)',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-gray-800)' }}>
                                    Need Immediate Assistance?
                                </h3>
                                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-xl)' }}>
                                    For urgent appointments or inquiries, please call us directly.
                                </p>
                                <a
                                    href="tel:+911234567890"
                                    className="btn btn-primary btn-lg"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Call +91 123 456 7890
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BookAppointment;
