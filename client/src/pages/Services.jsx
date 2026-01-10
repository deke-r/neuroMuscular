import React from 'react';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import ServiceCard from '../components/cards/ServiceCard';
import CTASection from '../components/sections/CTASection';
import { services } from '../data/services.data';

const Services = () => {
    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Services', path: '/services' }
    ];

    return (
        <>
            <PageHelmet
                title="Our Services - MusculoNeuro Rehab | Comprehensive Rehabilitation Care"
                description="Explore our comprehensive rehabilitation services including neuro rehabilitation, physical therapy, occupational therapy, speech therapy, geriatric rehabilitation, pelvic floor rehabilitation, and more."
                keywords="rehabilitation services, neuro rehabilitation, physical therapy, occupational therapy, speech therapy, pediatric rehabilitation, sports rehabilitation, geriatric rehabilitation, pelvic floor rehabilitation"
                canonicalUrl="https://musculoneurorehab.com/services"
            />

            <PageHeader
                title="Our Services"
                subtitle="Comprehensive Rehabilitation Solutions Tailored to Your Needs"
                breadcrumbs={breadcrumbs}
                backgroundImage="/img/hero/services-hero.jpg"
            />

            <section className="section-padding">
                <div className="container">
                    <div className="row g-4">
                        {services.map((service) => (
                            <div key={service.id} className="col-lg-4 col-md-6">
                                <ServiceCard {...service} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection
                title="Not Sure Which Service You Need?"
                description="Our expert team can help you determine the best treatment plan for your condition."
                buttonText="Book a Consultation"
                buttonLink="/book-appointment"
                variant="primary"
            />
        </>
    );
};

export default Services;
