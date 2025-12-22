import React from 'react';
import { FaAward, FaUsers, FaHospital } from 'react-icons/fa';
import PageHelmet from '../utils/PageHelmet.jsx';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import DoctorsSection from '../components/sections/DoctorsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import StatsBox from '../components/common/StatsBox';
import { services } from '../data/services.data';
import { doctors } from '../data/doctors.data';
import { testimonials } from '../data/testimonials.data';

const Home = () => {
    const heroData = {
        title: 'Expert Neuro & Physical Rehabilitation Care',
        subtitle: 'Welcome to PMR Hospital',
        ctaText: 'Book Appointment',
        ctaLink: '/book-appointment',
        backgroundImage: '/img/hero/infrastructure-hero.jpg',
        features: [
            { icon: FaAward, text: 'Evidence-Based Treatment' },
            { icon: FaUsers, text: 'Expert Medical Team' },
            { icon: FaHospital, text: 'State-of-the-Art Facilities' }
        ]
    };

    return (
        <>
            <PageHelmet
                title="PMR Hospital - Expert Neuro & Physical Rehabilitation Care"
                description="Leading rehabilitation center in Delhi providing comprehensive neuro and physical rehabilitation services. Expert care for stroke, spinal injuries, and neurological conditions."
                keywords="PMR Hospital, rehabilitation center, neuro rehabilitation, physical therapy, stroke recovery, spinal injury, Delhi hospital"
                canonicalUrl="https://pmrhospital.com/"
            />

            <HeroSection {...heroData} />

            <section className="section-padding">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <StatsBox number="2" suffix="" label="Expert Physiotherapists" icon={FaAward} />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <StatsBox number="4" suffix="" label="Specialized Services" icon={FaUsers} />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <StatsBox number="95" suffix="%" label="Success Rate" icon={FaHospital} />
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
