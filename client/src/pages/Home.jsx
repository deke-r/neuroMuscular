import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAward, FaUsers, FaHospital, FaUserMd } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import DoctorsSection from '../components/sections/DoctorsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import StatsBox from '../components/common/StatsBox';
import { services } from '../data/services.data';
import { testimonials } from '../data/testimonials.data';

const Home = () => {
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

    const heroData = {
        title: 'Expert Ortho, Neuro & Sports Rehabilitation Care',
        subtitle: 'Welcome to MuscloNeuro Rehab',
        ctaText: 'Book Appointment',
        ctaLink: '/book-appointment',
        backgroundImage: '/img/hero/infrastructure-hero.jpg',
        features: [
            { icon: FaAward, text: 'Evidence-Based Treatment' },
            { icon: FaUsers, text: 'Expert Medical Team' },
            { icon: FaHospital, text: 'State-of-the-Art Facilities' }
        ]
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }

    return (
        <>
            <PageHelmet
                title="MuscloNeuro Rehab - Expert Ortho, Neuro & Sports Rehabilitation Care"
                description="Leading rehabilitation center in Delhi providing comprehensive neuro and physical rehabilitation services. Expert care for stroke, spinal injuries, and neurological conditions."
                keywords="MuscloNeuroRehab, rehabilitation center, neuro rehabilitation, physical therapy, stroke recovery, spinal injury, Delhi hospital"
                canonicalUrl="https://musculoneurorehab.com/"
            />

            <HeroSection {...heroData} />

            <section className="section-padding">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6">
                            <StatsBox number={doctors.length.toString()} suffix="" label="Expert Physiotherapists" icon={FaAward} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <StatsBox number={services.length.toString()} suffix="" label="Specialized Services" icon={FaUsers} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <StatsBox number="95" suffix="%" label="Success Rate" icon={FaHospital} />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <StatsBox number="1" suffix="" label="Expert Doctor Consultation" icon={FaUserMd} />
                        </div>
                    </div>
                </div>
            </section>

            <ServicesSection
                title="Our Specialized Services"
                subtitle="What We Offer"
                services={services.slice(0, 6)}
            />

            <DoctorsSection
                title="Meet Our Expert Team"
                subtitle="Our Doctors"
                doctors={doctors.slice(0, 3)}
            />

            <TestimonialsSection
                title="What Our Patients Say"
                subtitle="Testimonials"
                testimonials={testimonials}
            />

            <CTASection
                title="Ready to Start Your Recovery Journey?"
                description="Book an appointment with our expert team and take the first step towards better health and independence."
                buttonText="Book Appointment Now"
                buttonLink="/book-appointment"
                variant="primary"
            />
        </>
    );
};

export default Home;
