import React from 'react';
import { FaHospital, FaDumbbell, FaBed, FaWheelchair, FaMicroscope, FaAmbulance } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import SectionHeader from '../components/common/SectionHeader';
import IconText from '../components/common/IconText';

const Infrastructure = () => {
    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Infrastructure', path: '/infrastructure' }
    ];

    const facilities = [
        {
            icon: FaHospital,
            title: 'Modern Facility',
            description: '50,000 sq ft state-of-the-art rehabilitation center with spacious therapy areas and comfortable patient rooms.'
        },
        {
            icon: FaDumbbell,
            title: 'Advanced Gym',
            description: 'Fully equipped therapeutic gym with latest rehabilitation equipment and assistive devices.'
        },
        {
            icon: FaBed,
            title: 'Inpatient Care',
            description: '30-bed inpatient facility with 24/7 nursing care and medical supervision.'
        },
        {
            icon: FaWheelchair,
            title: 'Accessibility',
            description: 'Wheelchair accessible throughout with ramps, elevators, and specially designed therapy areas.'
        },
        {
            icon: FaMicroscope,
            title: 'Diagnostic Lab',
            description: 'On-site diagnostic laboratory for quick and accurate medical testing.'
        },
        {
            icon: FaAmbulance,
            title: 'Emergency Care',
            description: '24/7 emergency services with trained staff and ambulance facility.'
        }
    ];

    const equipment = [
        'Treadmill with body weight support system',
        'Robotic gait training equipment',
        'Functional electrical stimulation devices',
        'Therapeutic ultrasound and electrotherapy units',
        'Occupational therapy equipment and ADL training setup',
        'Speech therapy tools and swallowing assessment equipment',
        'Pediatric therapy equipment and sensory integration tools',
        'Hydrotherapy pool (coming soon)'
    ];

    return (
        <>
            <PageHelmet
                title="Infrastructure & Facilities - MusculoNeuro Rehab | State-of-the-Art Equipment"
                description="Explore our modern rehabilitation facility featuring advanced equipment, spacious therapy areas, inpatient care, and comprehensive diagnostic services."
                keywords="rehabilitation facility, modern hospital infrastructure, therapy equipment, inpatient care, diagnostic lab, accessible facility"
                canonicalUrl="https://musculoneurorehab.com/infrastructure"
            />

            <PageHeader
                title="Our Infrastructure"
                subtitle="State-of-the-Art Facilities for Optimal Recovery"
                breadcrumbs={breadcrumbs}
                backgroundImage="/img/hero/infrastructure-hero.jpg"
            />

            <section className="section-padding">
                <div className="container">
                    <SectionHeader
                        subtitle="Our Facilities"
                        title="World-Class Infrastructure"
                        description="Our modern facility is designed to provide the best environment for your rehabilitation journey."
                        align="center"
                    />
                    <div className="row g-4">
                        {facilities.map((facility, index) => (
                            <div key={index} className="col-lg-4 col-md-6">
                                <div style={{
                                    background: 'var(--color-white)',
                                    padding: 'var(--spacing-xl)',
                                    borderRadius: 'var(--radius-xl)',
                                    boxShadow: 'var(--shadow-md)',
                                    height: '100%',
                                    transition: 'all var(--transition-base)',
                                    border: '1px solid var(--color-gray-200)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    }}>
                                    <facility.icon style={{ fontSize: 'var(--font-size-4xl)', color: 'var(--color-primary)', marginBottom: 'var(--spacing-lg)' }} />
                                    <h4 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-gray-800)' }}>
                                        {facility.title}
                                    </h4>
                                    <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-gray-600)', lineHeight: 'var(--line-height-relaxed)', margin: 0 }}>
                                        {facility.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--color-light)' }}>
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <SectionHeader
                                subtitle="Equipment"
                                title="Advanced Rehabilitation Technology"
                                description="We invest in the latest rehabilitation equipment to ensure the best outcomes for our patients."
                                align="left"
                            />
                        </div>
                        <div className="col-lg-6">
                            <div style={{
                                background: 'var(--color-white)',
                                padding: 'var(--spacing-2xl)',
                                borderRadius: 'var(--radius-xl)',
                                boxShadow: 'var(--shadow-lg)'
                            }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {equipment.map((item, index) => (
                                        <li key={index} style={{
                                            padding: 'var(--spacing-md) 0',
                                            borderBottom: index < equipment.length - 1 ? '1px solid var(--color-gray-200)' : 'none',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 'var(--spacing-md)'
                                        }}>
                                            <span style={{ color: 'var(--color-secondary)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>✓</span>
                                            <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-gray-700)', lineHeight: 'var(--line-height-relaxed)' }}>
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div style={{
                                background: 'var(--gradient-primary)',
                                padding: 'var(--spacing-3xl)',
                                borderRadius: 'var(--radius-2xl)',
                                textAlign: 'center',
                                color: 'var(--color-white)'
                            }}>
                                <h3 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-lg)' }}>
                                    Visit Our Facility
                                </h3>
                                <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--spacing-xl)', opacity: 0.95 }}>
                                    Schedule a tour of our facility to see our infrastructure and meet our team in person.
                                </p>
                                <a
                                    href="/contact"
                                    className="btn btn-lg"
                                    style={{
                                        background: 'var(--color-white)',
                                        color: 'var(--color-primary)',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Schedule a Tour
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Infrastructure;
