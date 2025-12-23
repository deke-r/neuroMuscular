import React, { useState, useEffect, useRef } from 'react';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import DoctorSelection from '../components/appointment/DoctorSelection';
import ServiceSelection from '../components/appointment/ServiceSelection';
import DateTimeSelection from '../components/appointment/DateTimeSelection';
import PatientForm from '../components/appointment/PatientForm';
import BookingConfirmation from '../components/appointment/BookingConfirmation';
import { fetchDoctors, fetchServicesByDoctor, bookAppointment } from '../utils/api';
import styles from '../styles/pages/BookAppointment.module.css';

const BookAppointment = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingError, setBookingError] = useState(null);

    // Form data
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [patientData, setPatientData] = useState({});
    const [confirmedAppointment, setConfirmedAppointment] = useState(null);

    const patientFormRef = useRef(null);

    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Book Appointment', path: '/book-appointment' }
    ];

    const steps = [
        { number: 1, label: 'Select Doctor' },
        { number: 2, label: 'Choose Service' },
        { number: 3, label: 'Date & Time' },
        { number: 4, label: 'Your Details' },
        { number: 5, label: 'Confirmation' }
    ];

    useEffect(() => {
        loadDoctors();
    }, []);

    useEffect(() => {
        if (selectedDoctor) {
            loadServices(selectedDoctor.id);
        }
    }, [selectedDoctor]);

    const loadDoctors = async () => {
        try {
            setLoading(true);
            const data = await fetchDoctors();
            setDoctors(data);
        } catch (err) {
            setError('Failed to load doctors. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const loadServices = async (doctorId) => {
        try {
            const data = await fetchServicesByDoctor(doctorId);
            setServices(data);
        } catch (err) {
            setError('Failed to load services. Please try again later.');
        }
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setSelectedService(null);
        setSelectedDate('');
        setSelectedTime('');
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handlePatientFormSubmit = async (data) => {
        setPatientData(data);
        setBookingError(null);

        // Prepare appointment data
        const appointmentData = {
            doctorId: selectedDoctor.id,
            serviceId: selectedService.id,
            patientName: data.patientName,
            patientEmail: data.patientEmail,
            patientPhone: data.patientPhone,
            patientAge: data.patientAge ? parseInt(data.patientAge) : null,
            patientGender: data.patientGender || null,
            appointmentDate: selectedDate,
            appointmentTime: selectedTime,
            notes: data.notes || null
        };

        try {
            const result = await bookAppointment(appointmentData);
            setConfirmedAppointment({
                ...appointmentData,
                doctorName: selectedDoctor.name,
                serviceName: selectedService.service_name
            });
            setCurrentStep(5);
        } catch (err) {
            setBookingError(err.message || 'Failed to book appointment. Please try again.');
        }
    };

    const handleNext = () => {
        if (currentStep === 4) {
            // Trigger form submission
            if (patientFormRef.current) {
                patientFormRef.current.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                );
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
        setBookingError(null);
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return selectedDoctor !== null;
            case 2:
                return selectedService !== null;
            case 3:
                return selectedDate && selectedTime;
            case 4:
                return true; // Form validation handles this
            default:
                return false;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h2 className={styles.formTitle}>Select Your Doctor</h2>
                        <p className={styles.formSubtitle}>
                            Choose from our team of experienced specialists
                        </p>
                        {loading && <div className={styles.loading}>Loading doctors...</div>}
                        {error && <div className={styles.error}>{error}</div>}
                        {!loading && !error && (
                            <DoctorSelection
                                doctors={doctors}
                                selectedDoctor={selectedDoctor}
                                onSelectDoctor={handleDoctorSelect}
                            />
                        )}
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 className={styles.formTitle}>Choose a Service</h2>
                        <p className={styles.formSubtitle}>
                            Select the treatment or consultation you need
                        </p>
                        <ServiceSelection
                            services={services}
                            selectedService={selectedService}
                            onSelectService={handleServiceSelect}
                        />
                    </>
                );
            case 3:
                return (
                    <>
                        <h2 className={styles.formTitle}>Select Date & Time</h2>
                        <p className={styles.formSubtitle}>
                            Choose your preferred appointment slot
                        </p>
                        <DateTimeSelection
                            doctorId={selectedDoctor.id}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            onSelectDate={handleDateSelect}
                            onSelectTime={handleTimeSelect}
                        />
                    </>
                );
            case 4:
                return (
                    <>
                        <h2 className={styles.formTitle}>Your Information</h2>
                        <p className={styles.formSubtitle}>
                            Please provide your contact details
                        </p>
                        {bookingError && <div className={styles.error}>{bookingError}</div>}
                        <div ref={patientFormRef}>
                            <PatientForm
                                onSubmit={handlePatientFormSubmit}
                                initialData={patientData}
                            />
                        </div>
                    </>
                );
            case 5:
                return (
                    <BookingConfirmation appointmentDetails={confirmedAppointment} />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <PageHelmet
                title="Book Appointment - PMR Hospital | Schedule Your Visit"
                description="Book an appointment with our expert rehabilitation specialists. Choose your doctor, select a service, and pick a convenient time slot."
                keywords="book appointment, schedule visit, doctor appointment, rehabilitation booking, PMR hospital appointment"
                canonicalUrl="https://pmrhospital.com/book-appointment"
            />

            <PageHeader
                title="Book an Appointment"
                subtitle="Schedule Your Visit with Our Expert Team"
                breadcrumbs={breadcrumbs}
                backgroundImage="/img/hero/contact-hero.jpg"
            />

            <div className={styles.appointmentPage}>
                <div className={styles.container}>
                    {/* Progress Bar */}
                    {currentStep < 5 && (
                        <div className={styles.progressBar}>
                            {steps.map((step) => (
                                <div key={step.number} className={styles.progressStep}>
                                    <div
                                        className={`${styles.stepCircle} ${currentStep === step.number
                                                ? styles.active
                                                : currentStep > step.number
                                                    ? styles.completed
                                                    : ''
                                            }`}
                                    >
                                        {currentStep > step.number ? '✓' : step.number}
                                    </div>
                                    <span
                                        className={`${styles.stepLabel} ${currentStep === step.number ? styles.active : ''
                                            }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Form Card */}
                    <div className={styles.formCard}>
                        {renderStepContent()}

                        {/* Navigation Buttons */}
                        {currentStep < 5 && (
                            <div className={styles.buttonGroup}>
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        className={styles.btnSecondary}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className={styles.btnPrimary}
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                >
                                    {currentStep === 4 ? 'Confirm Booking' : 'Next'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookAppointment;
