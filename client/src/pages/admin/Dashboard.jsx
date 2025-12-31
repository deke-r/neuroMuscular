import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styles from '../../styles/admin/Dashboard.module.css';
import DoctorsManagement from './DoctorsManagement';
import ServicesManagement from './ServicesManagement';
import AppointmentsManagement from './AppointmentsManagement';
import Settings from './Settings';
import ManagersManagement from './ManagersManagement';

const DashboardHome = ({ stats, user }) => (
    <>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>

        <div className={styles.statsGrid}>
            {user.role === 'admin' && (
                <>
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
                </>
            )}

            <div className={styles.statCard}>
                <div className={styles.statIcon}>📅</div>
                <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.appointments}</h3>
                    <p className={styles.statLabel}>Total Appointments</p>
                </div>
            </div>

            <div className={styles.statCard}>
                <div className={styles.statIcon}>📆</div>
                <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.todayTotal || 0}</h3>
                    <p className={styles.statLabel}>Appointments Today</p>
                </div>
            </div>

            <div className={styles.statCard}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.todayCompleted || 0}</h3>
                    <p className={styles.statLabel}>Completed Today</p>
                </div>
            </div>

            <div className={styles.statCard}>
                <div className={styles.statIcon}>⏳</div>
                <div className={styles.statInfo}>
                    <h3 className={styles.statValue}>{stats.todayPending || 0}</h3>
                    <p className={styles.statLabel}>Pending Today</p>
                </div>
            </div>
        </div>

        <div className={styles.quickActions}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.actionsGrid}>
                {user.role === 'admin' && (
                    <>
                        <Link to="/admin/dashboard/doctors" className={styles.actionCard}>
                            <span className={styles.actionIcon}>➕</span>
                            <span>Add New Doctor</span>
                        </Link>
                        <Link to="/admin/dashboard/services" className={styles.actionCard}>
                            <span className={styles.actionIcon}>➕</span>
                            <span>Add New Service</span>
                        </Link>
                    </>
                )}
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
    const [stats, setStats] = useState({
        doctors: 0,
        services: 0,
        appointments: 0,
        todayTotal: 0,
        todayCompleted: 0,
        todayPending: 0
    });

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/admin/login');
            return;
        }

        try {
            // Verify token and check role
            const decoded = jwtDecode(token);

            // Check if token is expired
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/admin/login');
                return;
            }

            // Check if user is admin or appointment_manager
            if (decoded.role !== 'admin' && decoded.role !== 'appointment_manager') {
                alert('Access denied. Admin or Appointment Manager privileges required.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/admin/login');
                return;
            }

            setUser(JSON.parse(userData));

            // Fetch stats
            fetchStats(token);
        } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/admin/login');
        }
    }, [navigate]);

    const fetchStats = async (token) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const today = new Date().toISOString().split('T')[0];
            const userData = JSON.parse(localStorage.getItem('user'));

            // Fetch appointments data for all roles
            const [appointmentsRes, todayAppointmentsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/appointments/admin?limit=1`, { headers }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/appointments/admin?date=${today}&limit=1000`, { headers })
            ]);

            // Calculate today's stats
            const todayAppointments = todayAppointmentsRes.data.data || [];
            const completedToday = todayAppointments.filter(apt => apt.status === 'completed').length;
            // Pending = confirmed appointments that are yet to be completed
            const pendingToday = todayAppointments.filter(apt => apt.status === 'confirmed').length;

            let doctorsCount = 0;
            let servicesCount = 0;

            // Only fetch doctors and services for admin role
            if (userData?.role === 'admin') {
                try {
                    const [doctorsRes, servicesRes] = await Promise.all([
                        axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`),
                        axios.get(`${import.meta.env.VITE_API_URL}/api/services`, { headers })
                    ]);
                    doctorsCount = doctorsRes.data.count || 0;
                    servicesCount = servicesRes.data.count || 0;
                } catch (error) {
                    console.error('Error fetching doctors/services:', error);
                }
            }

            setStats({
                doctors: doctorsCount,
                services: servicesCount,
                appointments: appointmentsRes.data.total || 0,
                todayTotal: todayAppointments.length,
                todayCompleted: completedToday,
                todayPending: pendingToday
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
                    <h2 className={styles.logo}>NeuroMusculoRehab</h2>
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

                    {/* Admin-only menu items */}
                    {user.role === 'admin' && (
                        <>
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
                        </>
                    )}

                    {/* Accessible by both admin and appointment_manager */}
                    <Link
                        to="/admin/dashboard/appointments"
                        className={`${styles.navItem} ${location.pathname.includes('/appointments') ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>📅</span>
                        Appointments
                    </Link>

                    {/* Admin-only menu items */}
                    {user.role === 'admin' && (
                        <>
                            <Link
                                to="/admin/dashboard/managers"
                                className={`${styles.navItem} ${location.pathname.includes('/managers') ? styles.active : ''}`}
                            >
                                <span className={styles.icon}>👥</span>
                                Managers
                            </Link>
                            <Link
                                to="/admin/dashboard/settings"
                                className={`${styles.navItem} ${location.pathname.includes('/settings') ? styles.active : ''}`}
                            >
                                <span className={styles.icon}>⚙️</span>
                                Settings
                            </Link>
                        </>
                    )}
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
                        <Route index element={<DashboardHome stats={stats} user={user} />} />
                        <Route path="doctors" element={<DoctorsManagement />} />
                        <Route path="services" element={<ServicesManagement />} />
                        <Route path="appointments" element={<AppointmentsManagement />} />
                        <Route path="managers" element={<ManagersManagement />} />
                        <Route path="settings" element={<Settings />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
