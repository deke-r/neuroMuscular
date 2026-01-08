import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '../../styles/form/ContactForm.module.css';

const ContactForm = ({
    formTitle = 'Send us a Message',
    submitButtonText = 'Send Message',
    successMessage = 'Thank you for contacting us! We will get back to you within 24 hours.'
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
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

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 5000);
            } else {
                setErrorMessage(result.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
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

            {errorMessage && (
                <div className={styles.errorMessageBox}>
                    <p>{errorMessage}</p>
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

                    <div className="col-12">
                        <div className={styles.formGroup}>
                            <label htmlFor="subject" className={styles.label}>Subject *</label>
                            <input
                                id="subject"
                                type="text"
                                className={`${styles.input} ${errors.subject ? styles.error : ''}`}
                                placeholder="What is this regarding?"
                                {...register('subject', {
                                    required: 'Subject is required',
                                    minLength: { value: 3, message: 'Subject must be at least 3 characters' }
                                })}
                            />
                            {errors.subject && <span className={styles.errorMessage}>{errors.subject.message}</span>}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>Message *</label>
                            <textarea
                                id="message"
                                rows="6"
                                className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                                placeholder="Write your message here..."
                                {...register('message', {
                                    required: 'Message is required',
                                    minLength: { value: 10, message: 'Message must be at least 10 characters' }
                                })}
                            />
                            {errors.message && <span className={styles.errorMessage}>{errors.message.message}</span>}
                        </div>
                    </div>

                    <div className="col-12">
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : submitButtonText}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
