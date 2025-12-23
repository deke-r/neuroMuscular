import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../styles/appointment/PatientForm.module.css';

const PatientForm = ({ onSubmit, initialData = {} }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: initialData
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder="Any specific concerns or information you'd like to share..."
                    {...register('notes')}
                />
            </div>
        </form>
    );
};

export default PatientForm;
