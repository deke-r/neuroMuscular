import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import PageHelmet from '../utils/PageHelmet.jsx';
import PageHeader from '../components/layout/PageHeader';
import { fetchDoctors, fetchServicesByDoctor, fetchAvailableSlots } from '../utils/api';
import styles from '../styles/pages/BookAppointment.module.css';

const BookAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingServices, setLoadingServices] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm();

    const watchDate = watch('appointmentDate');

    const breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Book Appointment', path: '/book-appointment' }
    ];

    useEffect(() => {
        loadDoctors();
    }, []);

    // Load time slots when date changes
    useEffect(() => {
        if (selectedDoctor && watchDate) {
            loadTimeSlots(selectedDoctor.id, watchDate);
            setValue('appointmentTime', '');
        }
    }, [watchDate]);

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
            setLoadingServices(true);
            const data = await fetchServicesByDoctor(doctorId);
            setServices(data);
        } catch (err) {
            console.error('Failed to load services:', err);
            setServices([]);
        } finally {
            setLoadingServices(false);
        }
    };

    const loadTimeSlots = async (doctorId, date) => {
        try {
            setLoadingSlots(true);
            const data = await fetchAvailableSlots(doctorId, date);
            setAvailableSlots(data.availableSlots || []);
        } catch (err) {
            console.error('Failed to load time slots:', err);
            setAvailableSlots([]);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setValue('doctorId', doctor.id);
        loadServices(doctor.id);
    };

    const handleChangeDoctor = () => {
        setSelectedDoctor(null);
        setValue('doctorId', '');
        setValue('serviceId', '');
        setValue('appointmentDate', '');
        setValue('appointmentTime', '');
        setServices([]);
        setAvailableSlots([]);
    };

    const onSubmit = async (data) => {
        setError(null);

        try {
            const appointmentData = {
                doctorId: parseInt(data.doctorId),
                serviceId: parseInt(data.serviceId),
                patientName: data.patientName,
                patientEmail: data.patientEmail,
                patientPhone: data.patientPhone,
                patientAge: data.patientAge ? parseInt(data.patientAge) : null,
                patientGender: data.patientGender || null,
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
                notes: data.notes || null
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/api/appointments`, appointmentData);

            setSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBookAnother = () => {
        setSuccess(false);
        setSelectedDoctor(null);
        setValue('doctorId', '');
        setValue('serviceId', '');
        setValue('appointmentDate', '');
        setValue('appointmentTime', '');
        setValue('patientName', '');
        setValue('patientEmail', '');
        setValue('patientPhone', '');
        setValue('patientAge', '');
        setValue('patientGender', '');
        setValue('notes', '');
        setServices([]);
        setAvailableSlots([]);
    };

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    if (success) {
        return (
            <>
                <PageHelmet
                    title="Appointment Confirmed - PMR Hospital"
                    description="Your appointment has been successfully booked."
                    keywords="appointment confirmed, booking success"
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
                        <div className={styles.successCard}>
                            <div className={styles.successIcon}>✓</div>
                            <h2 className={styles.successTitle}>Appointment Booked Successfully!</h2>
                            <p className={styles.successMessage}>
                                Your appointment has been confirmed. You will receive a confirmation email shortly.
                            </p>
                            <button
                                onClick={handleBookAnother}
                                className={styles.btnPrimary}
                            >
                                Book Another Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

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
                    {error && (
                        <div className={styles.errorAlert}>
                            {error}
                        </div>
                    )}

                    <div className={styles.formCard}>
                        {!selectedDoctor ? (
                            <>
                                <h2 className={styles.formTitle}>Select Your Doctor</h2>
                                <p className={styles.formSubtitle}>
                                    Choose from our team of experienced specialists
                                </p>

                                {loading ? (
                                    <div className={styles.loading}>Loading doctors...</div>
                                ) : (
                                    <div className={styles.doctorGrid}>
                                        {doctors.map(doctor => {
                                            const imageUrl = doctor.image_url
                                                ? `${import.meta.env.VITE_API_URL}${doctor.image_url}`
                                                : 'https://via.placeholder.com/300x350/0C4379/FFFFFF?text=Doctor';

                                            return (
                                                <div
                                                    key={doctor.id}
                                                    className={styles.doctorCard}
                                                    onClick={() => handleDoctorSelect(doctor)}
                                                >
                                                    <img
                                                        src={imageUrl}
                                                        alt={doctor.name}
                                                        className={styles.doctorImage}
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/300x350/0C4379/FFFFFF?text=Doctor';
                                                        }}
                                                    />
                                                    <div className={styles.doctorInfo}>
                                                        <h3 className={styles.doctorName}>{doctor.name}</h3>
                                                        <p className={styles.doctorDesignation}>{doctor.designation}</p>
                                                        <p className={styles.doctorSpecialization}>{doctor.specialization}</p>
                                                        <p className={styles.doctorExperience}>{doctor.experience} Experience</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className={styles.selectedDoctorHeader}>
                                    <div className={styles.selectedDoctorInfo}>
                                        <h2 className={styles.formTitle}>Book Appointment</h2>
                                        <p className={styles.selectedDoctorText}>
                                            with <strong>{selectedDoctor.name}</strong> - {selectedDoctor.specialization}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleChangeDoctor}
                                        className={styles.changeDoctor}
                                    >
                                        Change Doctor
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className={styles.appointmentForm}>
                                    {/* Hidden doctor ID field */}
                                    <input type="hidden" {...register('doctorId')} />

                                    {/* Service Selection */}
                                    <div className={styles.formGroup}>
                                        <label htmlFor="serviceId">
                                            Select Service <span className={styles.required}>*</span>
                                        </label>
                                        <select
                                            id="serviceId"
                                            className={`${styles.formSelect} ${errors.serviceId ? styles.error : ''}`}
                                            {...register('serviceId', { required: 'Please select a service' })}
                                            disabled={loadingServices}
                                        >
                                            <option value="">
                                                {loadingServices ? 'Loading services...' : 'Choose a service'}
                                            </option>
                                            {services.map(service => (
                                                <option key={service.id} value={service.id}>
                                                    {service.service_name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.serviceId && (
                                            <span className={styles.errorMessage}>{errors.serviceId.message}</span>
                                        )}
                                    </div>

                                    {/* Date and Time Selection */}
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="appointmentDate">
                                                Appointment Date <span className={styles.required}>*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="appointmentDate"
                                                min={getMinDate()}
                                                className={`${styles.formInput} ${errors.appointmentDate ? styles.error : ''}`}
                                                {...register('appointmentDate', { required: 'Please select a date' })}
                                            />
                                            {errors.appointmentDate && (
                                                <span className={styles.errorMessage}>{errors.appointmentDate.message}</span>
                                            )}
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="appointmentTime">
                                                Appointment Time <span className={styles.required}>*</span>
                                            </label>
                                            <select
                                                id="appointmentTime"
                                                className={`${styles.formSelect} ${errors.appointmentTime ? styles.error : ''}`}
                                                {...register('appointmentTime', { required: 'Please select a time' })}
                                                disabled={!watchDate || loadingSlots}
                                            >
                                                <option value="">
                                                    {!watchDate
                                                        ? 'Select date first'
                                                        : loadingSlots
                                                            ? 'Loading slots...'
                                                            : 'Choose a time'}
                                                </option>
                                                {availableSlots.map(slot => (
                                                    <option key={slot} value={slot}>
                                                        {slot}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.appointmentTime && (
                                                <span className={styles.errorMessage}>{errors.appointmentTime.message}</span>
                                            )}
                                            {watchDate && availableSlots.length === 0 && !loadingSlots && (
                                                <span className={styles.infoMessage}>No slots available for this date</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Patient Information */}
                                    <h3 className={styles.sectionTitle}>Your Information</h3>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="patientName">
                                                Full Name <span className={styles.required}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="patientName"
                                                className={`${styles.formInput} ${errors.patientName ? styles.error : ''}`}
                                                {...register('patientName', { required: 'Name is required' })}
                                            />
                                            {errors.patientName && (
                                                <span className={styles.errorMessage}>{errors.patientName.message}</span>
                                            )}
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="patientEmail">
                                                Email <span className={styles.required}>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="patientEmail"
                                                className={`${styles.formInput} ${errors.patientEmail ? styles.error : ''}`}
                                                {...register('patientEmail', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                            />
                                            {errors.patientEmail && (
                                                <span className={styles.errorMessage}>{errors.patientEmail.message}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="patientPhone">
                                                Phone Number <span className={styles.required}>*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="patientPhone"
                                                className={`${styles.formInput} ${errors.patientPhone ? styles.error : ''}`}
                                                {...register('patientPhone', {
                                                    required: 'Phone number is required',
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: 'Please enter a valid 10-digit phone number'
                                                    }
                                                })}
                                            />
                                            {errors.patientPhone && (
                                                <span className={styles.errorMessage}>{errors.patientPhone.message}</span>
                                            )}
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="patientAge">Age</label>
                                            <input
                                                type="number"
                                                id="patientAge"
                                                className={styles.formInput}
                                                {...register('patientAge', {
                                                    min: { value: 1, message: 'Age must be at least 1' },
                                                    max: { value: 120, message: 'Age must be less than 120' }
                                                })}
                                            />
                                            {errors.patientAge && (
                                                <span className={styles.errorMessage}>{errors.patientAge.message}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="patientGender">Gender</label>
                                        <select
                                            id="patientGender"
                                            className={styles.formSelect}
                                            {...register('patientGender')}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="notes">Additional Notes</label>
                                        <textarea
                                            id="notes"
                                            className={styles.formTextarea}
                                            rows="4"
                                            placeholder="Any specific concerns or information you'd like to share..."
                                            {...register('notes')}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={styles.btnPrimary}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookAppointment;
