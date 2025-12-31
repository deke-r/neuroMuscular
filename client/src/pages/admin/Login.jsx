import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../styles/admin/Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, data);

            const result = response.data;

            if (!result.success) {
                setError(result.message || 'Login failed');
                setLoading(false);
                return;
            }

            // Store token and user info in localStorage
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));

            // Redirect to admin dashboard
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Network error. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.logoSection}>
                        <h1 className={styles.title}>NeuroMusculoRehab</h1>
                        <p className={styles.subtitle}>Admin Portal</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                        {error && (
                            <div className={styles.errorAlert}>
                                {error}
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
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

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                                    {...register('password', { required: 'Password is required' })}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className={styles.errorMessage}>{errors.password.message}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        <p className={styles.footerText}>
                            Default: admin@pmrhospital.com / admin123
                        </p>
                        <button
                            type="button"
                            className={styles.forgotPasswordLink}
                            onClick={() => navigate('/admin/forgot-password')}
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
