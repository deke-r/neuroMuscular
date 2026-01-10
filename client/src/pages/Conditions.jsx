import React from 'react';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import ConditionCard from '../components/cards/ConditionCard';
import CTASection from '../components/sections/CTASection';
import { conditions } from '../data/conditions.data';

const Conditions = () => {
    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Conditions', path: '/conditions' }
    ];

    return (
        <>
            <PageHelmet
                title="Conditions We Treat - MuscloNeuroRehab | Expert Rehabilitation Care"
                description="We specialize in treating stroke, spinal cord injuries, traumatic brain injury, Parkinson's disease, multiple sclerosis, cerebral palsy, and more."
                keywords="stroke rehabilitation, spinal cord injury treatment, traumatic brain injury, Parkinson's disease, multiple sclerosis, cerebral palsy, orthopedic rehabilitation"
                canonicalUrl="https://musculoneurorehab.com/conditions"
            />

            <PageHeader
                title="Conditions We Treat"
                subtitle="Expert Care for a Wide Range of Neurological and Musculoskeletal Conditions"
                breadcrumbs={breadcrumbs}
                backgroundImage="/img/hero/infrastructure-hero.jpg"
            />

            <section className="section-padding">
                <div className="container">
                    <div className="row g-4">
                        {conditions.map((condition) => (
                            <div key={condition.id} className="col-lg-3 col-md-6">
                                <ConditionCard {...condition} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection
                title="Need Help with Your Condition?"
                description="Our specialized team is here to create a personalized treatment plan for your recovery."
                buttonText="Schedule an Assessment"
                buttonLink="/book-appointment"
                variant="primary"
            />
        </>
    );
};

export default Conditions;
