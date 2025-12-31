import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import ContactForm from '../components/forms/ContactForm';
import IconText from '../components/common/IconText';

const Contact = () => {
    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Contact', path: '/contact' }
    ];

    const contactInfo = [
        {
            icon: FaMapMarkerAlt,
            title: 'Address',
            content: 'Plot number 114 Ground floor, Pocket 1 Jasola, Near DAV school opposite Police park, New Delhi, Delhi - 110025'
        },
        {
            icon: FaPhone,
            title: 'Phone',
            content: '+91 8882270509',
            link: 'tel:+918882270509'
        },
        {
            icon: FaEnvelope,
            title: 'Email',
            content: 'info@musculoneurorehab.com',
            link: 'mailto:info@musculoneurorehab.com'
        },
        {
            icon: FaClock,
            title: 'Working Hours',
            content: 'Mon - Sat: 9:00 AM - 6:00 PM\nSunday: Closed'
        }
    ];

    return (
        <>
            <PageHelmet
                title="Contact Us - NeuroMusculoRehab | Get in Touch"
                description="Contact NeuroMusculoRehab for appointments, inquiries, or to learn more about our rehabilitation services. We're here to help you on your recovery journey."
                keywords="contact NeuroMusculoRehab, rehabilitation center contact, book appointment, hospital address, phone number, email"
                canonicalUrl="https://pmrhospital.com/contact"
            />

            <PageHeader
                title="Contact Us"
                subtitle="We're Here to Help You on Your Recovery Journey"
                breadcrumbs={breadcrumbs}
                backgroundImage="/img/hero/contact-hero.jpg"
            />

            <section className="section-padding">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4">
                            <div style={{ position: 'sticky', top: '100px' }}>
                                <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-xl)', color: 'var(--color-gray-800)' }}>
                                    Get in Touch
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                                    {contactInfo.map((info, index) => (
                                        <div key={index} style={{
                                            background: 'var(--color-white)',
                                            padding: 'var(--spacing-xl)',
                                            borderRadius: 'var(--radius-lg)',
                                            boxShadow: 'var(--shadow-md)',
                                            border: '1px solid var(--color-gray-200)'
                                        }}>
                                            <info.icon style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }} />
                                            <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-gray-800)' }}>
                                                {info.title}
                                            </h4>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    style={{
                                                        fontSize: 'var(--font-size-base)',
                                                        color: 'var(--color-gray-600)',
                                                        lineHeight: 'var(--line-height-relaxed)',
                                                        textDecoration: 'none',
                                                        transition: 'color var(--transition-fast)'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gray-600)'}
                                                >
                                                    {info.content}
                                                </a>
                                            ) : (
                                                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-gray-600)', lineHeight: 'var(--line-height-relaxed)', margin: 0, whiteSpace: 'pre-line' }}>
                                                    {info.content}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding-sm" style={{ background: 'var(--color-light)' }}>
                <div className="container">
                    <div style={{
                        background: 'var(--color-white)',
                        borderRadius: 'var(--radius-xl)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-lg)',
                        height: '400px'
                    }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2916756447897!2d77.20902931508047!3d28.61393948241943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d9e2c1f%3A0x5d3f2f1c8c8c8c8c!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="NeuroMusculoRehab Location"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
