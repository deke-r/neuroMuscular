import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '../../styles/form/AdLandingForm.module.css';

const AdLandingForm = ({ onSuccess }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ad-form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setIsSubmitted(true);
                reset();

                // Call onSuccess callback after 2 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                    if (onSuccess) {
                        onSuccess();
                    }
                }, 2000);
            } else {
                setErrorMessage(result.message || 'Failed to submit appointment. Please try again.');
            }
        } catch (error) {
            console.error('Ad form error:', error);
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.formWrapper}>
            {isSubmitted && (
                <div className={styles.successMessage}>
                    <FaCheckCircle className={styles.successIcon} />
                    <p>Your appointment request has been submitted successfully! We will contact you soon.</p>
                </div>
            )}

            {errorMessage && (
                <div className={styles.errorMessageBox}>
                    <p>{errorMessage}</p>
                </div>
            )}

            {!isSubmitted && (
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
                                        },
                                        minLength: { value: 10, message: 'Phone number must be at least 10 digits' }
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
                                    <option value="musculoskeletal">Core Musculoskeletal Services</option>
                                    <option value="neurology-balance">Neurology and Balance Services</option>
                                    <option value="pain-electrotherapy">Pain and Electrotherapy Services</option>
                                    <option value="sports-spine">Sports, Spine, and Lifestyle Services</option>
                                    <option value="geriatric">Geriatric Rehabilitation</option>
                                    <option value="pelvic-floor">Pelvic Floor Rehabilitation</option>
                                    <option value="manual-therapy">Manual Therapy</option>
                                    <option value="oncology-pulmonary">Oncology & Pulmonary Rehabilitation</option>
                                </select>
                                {errors.service && <span className={styles.errorMessage}>{errors.service.message}</span>}
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
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Submitting...' : 'Book Appointment'}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AdLandingForm;
