const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { testConnection } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const workingHoursRoutes = require('./routes/workingHoursRoutes');
const clinicOffDaysRoutes = require('./routes/clinicOffDaysRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow both www and non-www versions
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://musculoneurorehab.com',
    'https://www.musculoneurorehab.com',
    'https://musculoneurorehab.in',
    'https://www.musculoneurorehab.in'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600 // Cache preflight requests for 10 minutes
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

// Test database connection
testConnection();

// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'MuscloNeuroRehab API Server',
        version: '1.0.0'
    });
});

// Test API endpoint
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'API is working correctly',
        timestamp: new Date().toISOString(),
        server: 'MuscloNeuroRehab Backend',
        emailConfig: {
            mailUser: process.env.MAIL_USER ? 'Configured ✅' : 'Missing ❌',
            mailPass: process.env.MAIL_PASS ? 'Configured ✅' : 'Missing ❌',
            emailRecipient: process.env.EMAIL_RECIPIENT || 'info@muscloneurorehab.com (default)'
        },
        database: 'Connected',
        port: process.env.PORT || 5000
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/working-hours', workingHoursRoutes);
app.use('/api/clinic-off-days', clinicOffDaysRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}`);
});
