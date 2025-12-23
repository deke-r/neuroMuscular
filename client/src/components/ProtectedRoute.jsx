import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem('token');

    // Check if user is authenticated
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    try {
        // Decode token to get user role
        const decoded = jwtDecode(token);
        const userRole = decoded.role;

        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            return <Navigate to="/admin/login" replace />;
        }

        // Check if user has required role
        if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
            // Redirect to appropriate dashboard based on role
            if (userRole === 'admin') {
                return <Navigate to="/admin/dashboard" replace />;
            } else if (userRole === 'manager') {
                return <Navigate to="/manager/dashboard" replace />;
            }
            return <Navigate to="/admin/login" replace />;
        }

        // User is authenticated and authorized
        return children;
    } catch (error) {
        // Invalid token
        localStorage.removeItem('token');
        return <Navigate to="/admin/login" replace />;
    }
};

export default ProtectedRoute;
