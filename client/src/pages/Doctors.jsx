import React from 'react';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import DoctorCard from '../components/cards/DoctorCard';
import CTASection from '../components/sections/CTASection';
import { doctors } from '../data/doctors.data';

const Doctors = () => {
    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Doctors', path: '/doctors' }
    ];

    return (
        <>
            <PageHelmet
                title="Our Doctors - PMR Hospital | Expert Rehabilitation Specialists"
                description="Meet our team of expert rehabilitation specialists including physiatrists, neurologists, physiotherapists, occupational therapists, and speech therapists."
                keywords="rehabilitation doctors, physiatrist, neurologist, physiotherapist, occupational therapist, speech therapist, expert medical team"
                canonicalUrl="https://pmrhospital.com/doctors"
            />

            <PageHeader
                title="Our Expert Team"
                subtitle="Meet the Specialists Dedicated to Your Recovery"
                breadcrumbs={breadcrumbs}
                backgroundImage="/img/hero/doctors-hero.jpg"
            />

            <section className="section-padding">
                <div className="container">
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

export default Doctors;
