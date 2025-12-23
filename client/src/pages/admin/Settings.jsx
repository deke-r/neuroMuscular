import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../styles/admin/Management.module.css';

const Settings = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const newPassword = watch('newPassword');

    const onSubmit = async (data) => {
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/admin/change-password`,
                {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess('Password changed successfully!');
            reset();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to change password');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Settings</h1>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Change Password</h2>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="currentPassword">
                            Current Password <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            className={`${styles.formInput} ${errors.currentPassword ? styles.error : ''}`}
                            {...register('currentPassword', {
                                required: 'Current password is required'
                            })}
                        />
                        {errors.currentPassword && (
                            <span className={styles.errorMessage}>{errors.currentPassword.message}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="newPassword">
                            New Password <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className={`${styles.formInput} ${errors.newPassword ? styles.error : ''}`}
                            {...register('newPassword', {
                                required: 'New password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />
                        {errors.newPassword && (
                            <span className={styles.errorMessage}>{errors.newPassword.message}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">
                            Confirm New Password <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value => value === newPassword || 'Passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && (
                            <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Changing Password...' : 'Change Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
