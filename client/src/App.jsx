import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './utils/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Conditions from './pages/Conditions';
import ConditionDetail from './pages/ConditionDetail';
import Doctors from './pages/Doctors';
import Packages from './pages/Packages';
import Infrastructure from './pages/Infrastructure';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import ThankYou from './pages/ThankYou';
import AdminLogin from './pages/admin/Login';
import ForgotPassword from './pages/admin/ForgotPassword';
import Dashboard from './pages/admin/Dashboard';
import AdLanding from './pages/AdLanding';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isThankYouPage = location.pathname === '/thank-you';
  const hideLayout = isAdminRoute || isThankYouPage;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideLayout && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/conditions/:conditionId" element={<ConditionDetail />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/ad" element={<AdLanding />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/dashboard/*" element={<Dashboard />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;