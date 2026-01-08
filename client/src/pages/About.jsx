import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaUserMd, FaBullseye, FaHandshake } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import SectionHeader from '../components/common/SectionHeader';
import StatsBox from '../components/common/StatsBox';
import DoctorCard from '../components/cards/DoctorCard';
import CTASection from '../components/sections/CTASection.jsx';
import { services } from '../data/services.data';

const About = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`);
            setDoctors(response.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setLoading(false);
        }
    };

    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' }
    ];

    const values = [
        {
            icon: FaHeart,
            title: 'Patient-Centered Care',
            description: 'We prioritize your comfort, dignity, and individual needs in every aspect of treatment.'
        },
        {
            icon: FaUserMd,
            title: 'Expert Team',
            description: 'Our multidisciplinary team brings years of specialized experience in rehabilitation medicine.'
        },
        {
            icon: FaBullseye,
            title: 'Evidence-Based Approach',
            description: 'We use the latest research and proven techniques to deliver the best outcomes.'
        },
        {
            icon: FaHandshake,
            title: 'Collaborative Care',
            description: 'We work closely with you and your family to achieve your rehabilitation goals.'
        }
    ];

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }

    return (
        <>
            <PageHelmet
                title="About Us - MuscloNeuroRehab | Leading Rehabilitation Center"
                description="Learn about MuscloNeuroRehab, our expert team, state-of-the-art facilities, and commitment to providing exceptional rehabilitation care in Delhi."
                keywords="about MuscloNeuroRehab, rehabilitation center Delhi, expert rehabilitation team, neuro rehabilitation facility"
                canonicalUrl="https://MuscloNeuroRehab.in/about"
            />

            <PageHeader
                title="About MuscloNeuroRehab"
                subtitle="Dedicated to Restoring Lives and Rebuilding Hope"
                breadcrumbs={breadcrumbs}
                backgroundImage="/img/hero/about-hero.jpg"
            />

            <section className="section-padding">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <SectionHeader
                                subtitle="Our Story"
                                title="Expert Rehabilitation Care"
                                align="left"
                            />
                            <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-gray-600)' }}>
                                MuscloNeuroRehab is a professional rehabilitation center dedicated to providing world-class rehabilitation services
                                to patients recovering from neurological and musculoskeletal conditions. Our vision is to become
                                a premier destination for comprehensive rehabilitation care.
                            </p>
                            <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-gray-600)' }}>
                                Our state-of-the-art facility combines advanced medical technology with compassionate care,
                                delivered by experienced physiotherapists committed to helping patients regain their independence and improve their quality of life.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="row g-4">
                                <div className="col-6">
                                    <StatsBox number={doctors.length.toString()} suffix="" label="Expert Physiotherapists" />
                                </div>
                                <div className="col-6">
                                    <StatsBox number={services.length.toString()} suffix="" label="Specialized Services" />
                                </div>
                                <div className="col-6">
                                    <StatsBox number="10" suffix="+" label="Years Combined Experience" />
                                </div>
                                <div className="col-6">
                                    <StatsBox number="95" suffix="%" label="Success Rate" />
                                </div>
                                <div className="col-6">
                                    <StatsBox number="1" suffix="" label="Expert Doctor Consultation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--color-light)' }}>
                <div className="container">
                    <SectionHeader
                        subtitle="Our Values"
                        title="What Drives Us"
                        description="Our core values guide everything we do, ensuring the highest quality care for every patient."
                        align="center"
                    />
                    <div className="row g-4">
                        {values.map((value, index) => (
                            <div key={index} className="col-lg-3 col-md-6">
                                <div style={{
                                    background: 'var(--color-white)',
                                    padding: 'var(--spacing-xl)',
                                    borderRadius: 'var(--radius-xl)',
                                    textAlign: 'center',
                                    height: '100%',
                                    boxShadow: 'var(--shadow-md)',
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
                                    <value.icon style={{ fontSize: 'var(--font-size-4xl)', color: 'var(--color-primary)', marginBottom: 'var(--spacing-lg)' }} />
                                    <h4 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-gray-800)' }}>
                                        {value.title}
                                    </h4>
                                    <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-gray-600)', lineHeight: 'var(--line-height-relaxed)', margin: 0 }}>
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <SectionHeader
                        subtitle="Our Team"
                        title="Meet Our Expert Doctors"
                        description="Our multidisciplinary team of specialists is dedicated to your recovery."
                        align="center"
                    />
                    <div className="row g-4 justify-content-center">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="col-lg-4 col-md-6">
                                <DoctorCard {...doctor} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection
                title="Ready to Meet Our Team?"
                description="Book an appointment with one of our expert specialists and start your journey to recovery."
                buttonText="Book Appointment"
                buttonLink="/book-appointment"
                variant="secondary"
            />
        </>
    );
};

export default About;
