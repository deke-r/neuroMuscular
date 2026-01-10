import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import DoctorCard from '../components/cards/DoctorCard';
import CTASection from '../components/sections/CTASection';

const Doctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`);
            setDoctors(response.data.data || []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching doctors:', err);
            setError('Failed to load doctors. Please try again later.');
            setLoading(false);
        }
    };

    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Doctors', path: '/doctors' }
    ];

    const handleDoctorClick = () => {
        navigate('/book-appointment');
    };

    return (
        <>
            <PageHelmet
                title="Our Doctors - MuscloNeuroRehab | Expert Rehabilitation Specialists"
                description="Meet our team of expert rehabilitation specialists including physiatrists, neurologists, physiotherapists, occupational therapists, and speech therapists."
                keywords="rehabilitation doctors, physiatrist, neurologist, physiotherapist, occupational therapist, speech therapist, expert medical team"
                canonicalUrl="https://MuscloNeuroRehab.in/doctors"
            />

            <PageHeader
                title="Our Expert Team"
                subtitle="Meet the Specialists Dedicated to Your Recovery"
                breadcrumbs={breadcrumbs}
                backgroundImage="/img/hero/doctors-hero.jpg"
            />

            <section className="section-padding">
                <div className="container">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3 text-muted">Loading our expert team...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
                    ) : doctors.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted">No doctors available at the moment.</p>
                        </div>
                    ) : (
                        <div className="row g-4 justify-content-center">
                            {doctors.map((doctor) => (
                                <div key={doctor.id} className="col-lg-4 col-md-6">
                                    <DoctorCard {...doctor} onClick={handleDoctorClick} />
                                </div>
                            ))}
                        </div>
                    )}
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
