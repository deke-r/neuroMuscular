import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/admin/Dashboard.module.css';
import DoctorsManagement from './DoctorsManagement';
import ServicesManagement from './ServicesManagement';
import AppointmentsManagement from './AppointmentsManagement';

const DashboardHome = ({ stats }) => (
    <>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>

        <div className={styles.statsGrid}>
            <div className={styles.statCard}>
                <div className={styles.statIcon}>👨‍⚕️</div>
                <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.doctors}</h3>
                    <p className={styles.statLabel}>Total Doctors</p>
                </div>
            </div>

            <div className={styles.statCard}>
                <div className={styles.statIcon}>🏥</div>
                <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.services}</h3>
                    <p className={styles.statLabel}>Total Services</p>
                </div>
            </div>

            <div className={styles.statCard}>
                <div className={styles.statIcon}>📅</div>
                <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.appointments}</h3>
                    <p className={styles.statLabel}>Total Appointments</p>
                </div>
            </div>
        </div>

        <div className={styles.quickActions}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.actionsGrid}>
                <Link to="/admin/dashboard/doctors" className={styles.actionCard}>
                    <span className={styles.actionIcon}>➕</span>
                    <span>Add New Doctor</span>
                </Link>
                <Link to="/admin/dashboard/services" className={styles.actionCard}>
                    <span className={styles.actionIcon}>➕</span>
                    <span>Add New Service</span>
                </Link>
                <Link to="/admin/dashboard/appointments" className={styles.actionCard}>
                    <span className={styles.actionIcon}>📋</span>
                    <span>View Appointments</span>
                </Link>
            </div>
        </div>
    </>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ doctors: 0, services: 0, appointments: 0 });

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/admin/login');
            return;
        }

        setUser(JSON.parse(userData));

        // Fetch stats
        fetchStats(token);
    }, [navigate]);

    const fetchStats = async (token) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };

            const [doctorsRes, servicesRes, appointmentsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`),
                axios.get(`${import.meta.env.VITE_API_URL}/api/services`, { headers }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/appointments/admin`, { headers })
            ]);

            setStats({
                doctors: doctorsRes.data.count || 0,
                services: servicesRes.data.count || 0,
                appointments: appointmentsRes.data.count || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.logo}>PMR Hospital</h2>
                    <p className={styles.adminLabel}>Admin Panel</p>
                </div>

                <nav className={styles.nav}>
                    <Link
                        to="/admin/dashboard"
                        className={`${styles.navItem} ${location.pathname === '/admin/dashboard' ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>📊</span>
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/dashboard/doctors"
                        className={`${styles.navItem} ${location.pathname.includes('/doctors') ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>👨‍⚕️</span>
                        Doctors
                    </Link>
                    <Link
                        to="/admin/dashboard/services"
                        className={`${styles.navItem} ${location.pathname.includes('/services') ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>🏥</span>
                        Services
                    </Link>
                    <Link
                        to="/admin/dashboard/appointments"
                        className={`${styles.navItem} ${location.pathname.includes('/appointments') ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>📅</span>
                        Appointments
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>{user.full_name || user.username}</p>
                        <p className={styles.userRole}>{user.role}</p>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <div className={styles.contentWrapper}>
                    <Routes>
                        <Route index element={<DashboardHome stats={stats} />} />
                        <Route path="doctors" element={<DoctorsManagement />} />
                        <Route path="services" element={<ServicesManagement />} />
                        <Route path="appointments" element={<AppointmentsManagement />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
