import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '../../styles/form/AppointmentForm.module.css';

const AppointmentForm = ({
    formTitle = 'Book an Appointment',
    submitButtonText = 'Book Appointment',
    successMessage = 'Your appointment request has been submitted successfully! We will contact you soon.'
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log('Appointment Form Data:', data);
        setIsSubmitted(true);
        reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);
    };

    return (
        <div className={styles.formWrapper}>
            {formTitle && <h3 className={styles.formTitle}>{formTitle}</h3>}

            {isSubmitted && (
                <div className={styles.successMessage}>
                    <FaCheckCircle className={styles.successIcon} />
                    <p>{successMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Full Name *</label>
                            <input
                                id="name"
                                type="text"
                                className={`${styles.input} ${errors.name ? styles.error : ''}`}
                                placeholder="Enter your full name"
                                {...register('name', {
                                    required: 'Name is required',
                                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                                })}
                            />
                            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address *</label>
                            <input
                                id="email"
                                type="email"
                                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                                placeholder="your.email@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label htmlFor="phone" className={styles.label}>Phone Number *</label>
                            <input
                                id="phone"
                                type="tel"
                                className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                                placeholder="+91 1234567890"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9+\s-()]+$/,
                                        message: 'Invalid phone number'
                                    }
                                })}
                            />
                            {errors.phone && <span className={styles.errorMessage}>{errors.phone.message}</span>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label htmlFor="service" className={styles.label}>Service Required *</label>
                            <select
                                id="service"
                                className={`${styles.input} ${errors.service ? styles.error : ''}`}
                                {...register('service', { required: 'Please select a service' })}
                            >
                                <option value="">Select a service</option>
                                <option value="neuro-rehab">Neuro Rehabilitation</option>
                                <option value="physical-therapy">Physical Therapy</option>
                                <option value="occupational-therapy">Occupational Therapy</option>
                                <option value="speech-therapy">Speech Therapy</option>
                                <option value="pediatric-rehab">Pediatric Rehabilitation</option>
                                <option value="sports-rehab">Sports Rehabilitation</option>
                            </select>
                            {errors.service && <span className={styles.errorMessage}>{errors.service.message}</span>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label htmlFor="date" className={styles.label}>Preferred Date *</label>
                            <input
                                id="date"
                                type="date"
                                className={`${styles.input} ${errors.date ? styles.error : ''}`}
                                min={new Date().toISOString().split('T')[0]}
                                {...register('date', { required: 'Date is required' })}
                            />
                            {errors.date && <span className={styles.errorMessage}>{errors.date.message}</span>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label htmlFor="time" className={styles.label}>Preferred Time *</label>
                            <select
                                id="time"
                                className={`${styles.input} ${errors.time ? styles.error : ''}`}
                                {...register('time', { required: 'Please select a time' })}
                            >
                                <option value="">Select a time</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="15:00">03:00 PM</option>
                                <option value="16:00">04:00 PM</option>
                                <option value="17:00">05:00 PM</option>
                            </select>
                            {errors.time && <span className={styles.errorMessage}>{errors.time.message}</span>}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>Additional Information</label>
                            <textarea
                                id="message"
                                rows="4"
                                className={styles.textarea}
                                placeholder="Tell us about your condition or any specific requirements..."
                                {...register('message')}
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <button type="submit" className={styles.submitButton}>
                            {submitButtonText}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
