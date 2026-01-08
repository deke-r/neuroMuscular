import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../styles/admin/ForgotPassword.module.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [verifiedOTP, setVerifiedOTP] = useState(''); // Store verified OTP
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    // Step 1: Send OTP to email
    const handleSendOTP = async (data) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
                email: data.email
            });

            if (response.data.success) {
                setEmail(data.email);
                setSuccess(response.data.message);
                setStep(2);
                reset();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOTP = async (data) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
                email: email,
                otp: data.otp
            });

            if (response.data.success) {
                setVerifiedOTP(data.otp); // Store the verified OTP
                setSuccess(response.data.message);
                setStep(3);
                reset();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset Password
    const handleResetPassword = async (data) => {
        setLoading(true);
        setError('');
        setSuccess('');

        if (data.newPassword !== data.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
                email: email,
                otp: verifiedOTP, // Use stored OTP
                newPassword: data.newPassword
            });

            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    navigate('/admin/login');
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.forgotPasswordPage}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Reset Password</h1>
                        <p className={styles.subtitle}>MuscloNeuroRehab Admin Portal</p>
                    </div>

                    {/* Step Indicator */}
                    <div className={styles.stepIndicator}>
                        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepLabel}>Email</div>
                        </div>
                        <div className={`${styles.stepLine} ${step >= 2 ? styles.active : ''}`}></div>
                        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepLabel}>Verify OTP</div>
                        </div>
                        <div className={`${styles.stepLine} ${step >= 3 ? styles.active : ''}`}></div>
                        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
                            <div className={styles.stepNumber}>3</div>
                            <div className={styles.stepLabel}>New Password</div>
                        </div>
                    </div>

                    {/* Alert Messages */}
                    {error && (
                        <div className={styles.errorAlert}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className={styles.successAlert}>
                            {success}
                        </div>
                    )}

                    {/* Step 1: Email Input */}
                    {step === 1 && (
                        <form onSubmit={handleSubmit(handleSendOTP)} className={styles.form}>
                            <p className={styles.instruction}>
                                Enter your registered email address to receive an OTP code.
                            </p>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <span className={styles.errorMessage}>{errors.email.message}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={loading}
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </form>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit(handleVerifyOTP)} className={styles.form}>
                            <p className={styles.instruction}>
                                Enter the 6-digit OTP code sent to <strong>{email}</strong>
                            </p>

                            <div className={styles.formGroup}>
                                <label htmlFor="otp" className={styles.label}>
                                    OTP Code
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    className={`${styles.input} ${errors.otp ? styles.inputError : ''}`}
                                    {...register('otp', {
                                        required: 'OTP is required',
                                        pattern: {
                                            value: /^[0-9]{6}$/,
                                            message: 'OTP must be 6 digits'
                                        }
                                    })}
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                />
                                {errors.otp && (
                                    <span className={styles.errorMessage}>{errors.otp.message}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>

                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={() => {
                                    setStep(1);
                                    setError('');
                                    setSuccess('');
                                    reset();
                                }}
                            >
                                Back to Email
                            </button>
                        </form>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <form onSubmit={handleSubmit(handleResetPassword)} className={styles.form}>
                            <p className={styles.instruction}>
                                Create a new password for your account.
                            </p>

                            <div className={styles.formGroup}>
                                <label htmlFor="newPassword" className={styles.label}>
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    className={`${styles.input} ${errors.newPassword ? styles.inputError : ''}`}
                                    {...register('newPassword', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                    placeholder="Enter new password"
                                />
                                {errors.newPassword && (
                                    <span className={styles.errorMessage}>{errors.newPassword.message}</span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="confirmPassword" className={styles.label}>
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password'
                                    })}
                                    placeholder="Confirm new password"
                                />
                                {errors.confirmPassword && (
                                    <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={loading}
                            >
                                {loading ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </form>
                    )}

                    <div className={styles.footer}>
                        <button
                            className={styles.backToLogin}
                            onClick={() => navigate('/admin/login')}
                        >
                            ← Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
