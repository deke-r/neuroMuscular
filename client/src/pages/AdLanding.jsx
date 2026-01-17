import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaAward, FaUsers, FaHospital, FaPhoneAlt } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import DoctorsSection from '../components/sections/DoctorsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import StatsBox from '../components/common/StatsBox';
import AdNavbar from '../components/layout/AdNavbar';
import AdFooter from '../components/layout/AdFooter';
import { services } from '../data/services.data';
import { testimonials } from '../data/testimonials.data';
import styles from '../styles/pages/AdLanding.module.css';

const AdLanding = () => {
    const navigate = useNavigate();
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

    const handleBookAppointment = () => {
        navigate('/book-appointment');
    };

    const heroData = {
        title: 'Transform Your Life with Expert Rehabilitation',
        subtitle: 'Professional Physiotherapy & Neuro Rehabilitation Services',
        ctaText: 'Book Free Consultation',
        ctaLink: '/book-appointment',
        backgroundImage: '/img/hero/ad-landing-hero.jpg',
        features: [
            { icon: FaAward, text: 'Certified Specialists' },
            { icon: FaUsers, text: '1000+ Happy Patients' },
            { icon: FaHospital, text: 'Advanced Equipment' }
        ]
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }

    return (
        <>
            <PageHelmet
                title="Expert Rehabilitation Services - Book Your Appointment Today"
                description="Get professional physiotherapy and neuro rehabilitation services from certified specialists. Book your free consultation now and start your recovery journey."
                keywords="physiotherapy, neuro rehabilitation, physical therapy, sports rehabilitation, pain management, expert physiotherapists"
                canonicalUrl="https://musculoneurorehab.com/expert-rehab"
            />

            <AdNavbar />

            {/* Hero Section with CTA */}
            <HeroSection {...heroData} />

            {/* Stats Section */}
            <section className="section-padding" style={{ background: '#f8f9fa' }}>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6">
                            <StatsBox number="10" suffix="+" label="Years Experience" icon={FaAward} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <StatsBox number="8" suffix="" label="Specialized Services" icon={FaUsers} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <StatsBox number="95" suffix="%" label="Success Rate" icon={FaHospital} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <StatsBox number="1000" suffix="+" label="Happy Patients" icon={FaPhoneAlt} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner 1 */}
            <section className={styles.darkBanner}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Ready to Start Your Recovery?</h2>
                        <p>Book your appointment today and get personalized treatment from our expert team</p>
                        <button onClick={handleBookAppointment} className={styles.greenButton}>
                            Book Appointment Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <ServicesSection
                title="Our Comprehensive Services"
                subtitle="What We Offer"
                services={services}
            />

            {/* CTA Banner 2 */}
            <section className={styles.ctaBanner} style={{ background: 'linear-gradient(135deg, #7CC339 0%, #5fa028 100%)' }}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Don't Wait - Take Action Today!</h2>
                        <p>Limited slots available. Book now to secure your preferred time</p>
                        <button onClick={handleBookAppointment} className={styles.whiteButton}>
                            Schedule Your Visit
                        </button>
                    </div>
                </div>
            </section>

            {/* Doctors Section */}
            <DoctorsSection
                title="Meet Our Expert Specialists"
                subtitle="Our Team"
                doctors={doctors.slice(0, 3)}
                onDoctorClick={handleBookAppointment}
            />

            {/* CTA Banner 3 */}
            <section className={styles.ctaBanner}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Experience the Difference</h2>
                        <p>Join thousands of satisfied patients who have transformed their lives</p>
                        <button onClick={handleBookAppointment} className={styles.greenButton}>
                            Get Started Today
                        </button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <TestimonialsSection
                title="Success Stories from Our Patients"
                subtitle="Testimonials"
                testimonials={testimonials}
            />

            {/* Final CTA Section */}
            <section className={styles.finalCta}>
                <div className="container">
                    <div className={styles.finalCtaContent}>
                        <h2>Your Journey to Recovery Starts Here</h2>
                        <p>Take the first step towards a healthier, pain-free life. Our expert team is ready to help you achieve your rehabilitation goals.</p>
                        <div className={styles.ctaButtons}>
                            <button onClick={handleBookAppointment} className={styles.greenButton}>
                                Book Free Consultation
                            </button>
                            <a href="tel:+918882270509" className={styles.secondaryButton}>
                                <FaPhoneAlt /> Call Now
                            </a>
                        </div>
                        <p className={styles.guarantee}>✓ No obligation • ✓ Free consultation • ✓ Expert advice</p>
                    </div>
                </div>
            </section>

            <AdFooter />
        </>
    );
};

export default AdLanding;
