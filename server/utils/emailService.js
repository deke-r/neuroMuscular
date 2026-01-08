const nodemailer = require('nodemailer');
require('dotenv').config();

// Debug: Check if email credentials are loaded
console.log('📧 Email Configuration Debug:');
console.log('MAIL_USER:', process.env.MAIL_USER ? '✅ Set' : '❌ Missing');
console.log('MAIL_PASS:', process.env.MAIL_PASS ? '✅ Set' : '❌ Missing');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email service configuration error:', error);
    } else {
        console.log('✅ Email service is ready to send emails');
    }
});

// Send OTP email
const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: `"MuscloNeuroRehab" <${process.env.MAIL_USER}>`,
            to: email,
            subject: 'Password Reset OTP - MuscloNeuroRehab',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                        }
                        .header {
                            background-color: #1289BF;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            
                        }
                        .otp-box {
                            background-color: #f0f8ff;
                            border: 2px dashed #1289BF;
                            padding: 20px;
                            text-align: center;
                            margin: 20px 0;
                            
                        }
                        .otp-code {
                            font-size: 32px;
                            font-weight: bold;
                            color: #1289BF;
                            letter-spacing: 5px;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #666;
                        }
                        .warning {
                            color: #d9534f;
                            font-size: 14px;
                            margin-top: 15px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>MuscloNeuroRehab</h1>
                            <p>Password Reset Request</p>
                        </div>
                        <div class="content">
                            <h2>Hello,</h2>
                            <p>We received a request to reset your password. Use the OTP code below to proceed with resetting your password:</p>
                            
                            <div class="otp-box">
                                <p style="margin: 0; font-size: 14px; color: #666;">Your OTP Code</p>
                                <div class="otp-code">${otp}</div>
                                <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">Valid for 5 minutes</p>
                            </div>
                            
                            <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
                            
                            <p class="warning">⚠️ Never share this OTP with anyone. MuscloNeuroRehab staff will never ask for your OTP.</p>
                            
                            <p>Best regards,<br><strong>MuscloNeuroRehab Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; ${new Date().getFullYear()} MuscloNeuroRehab. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ OTP email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);
        throw error;
    }
};

// Send appointment booking confirmation to patient
const sendAppointmentBookingEmail = async (patientEmail, appointmentDetails) => {
    try {
        const { patientName, doctorName, serviceName, appointmentDate, appointmentTime } = appointmentDetails;

        const mailOptions = {
            from: `"MuscloNeuroRehab" <${process.env.MAIL_USER}>`,
            to: patientEmail,
            subject: 'Appointment Booking Confirmation - MuscloNeuroRehab',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                        }
                        .header {
                            background-color: #1289BF;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            
                        }
                        .appointment-box {
                            background-color: #f0f8ff;
                            border-left: 4px solid #1289BF;
                            padding: 20px;
                            margin: 20px 0;
                            
                        }
                        .detail-row {
                            display: flex;
                            margin: 10px 0;
                            padding: 8px 0;
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .detail-label {
                            font-weight: bold;
                            color: #1289BF;
                            width: 140px;
                        }
                        .detail-value {
                            color: #333;
                        }
                        .status-badge {
                            display: inline-block;
                            background-color: #ffc107;
                            color: #000;
                            padding: 5px 15px;
                            
                            font-size: 14px;
                            font-weight: bold;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #666;
                        }
                        .note {
                            background-color: #fff3cd;
                            border-left: 4px solid #ffc107;
                            padding: 15px;
                            margin-top: 20px;
                            
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>MuscloNeuroRehab</h1>
                            <p>Appointment Confirmation</p>
                        </div>
                        <div class="content">
                            <h2>Hello ${patientName},</h2>
                            <p>Your appointment has been successfully booked. Here are the details:</p>
                            
                            <div class="appointment-box">
                                <div class="detail-row">
                                    <div class="detail-label">Doctor:</div>
                                    <div class="detail-value">${doctorName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Service:</div>
                                    <div class="detail-value">${serviceName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Date:</div>
                                    <div class="detail-value">${new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Time:</div>
                                    <div class="detail-value">${appointmentTime}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Status:</div>
                                    <div class="detail-value"><span class="status-badge">Pending Confirmation</span></div>
                                </div>
                            </div>
                            
                            <div class="note">
                                <strong>📌 Please Note:</strong> Your appointment is currently pending confirmation. You will receive another email once our team confirms your appointment.
                            </div>
                            
                            <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
                            
                            <p>Best regards,<br><strong>MuscloNeuroRehab Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; ${new Date().getFullYear()} MuscloNeuroRehab. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Appointment booking email sent to patient:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending appointment booking email:', error);
        throw error;
    }
};

// Send new appointment notification to appointment managers
const sendAppointmentManagerNotification = async (appointmentDetails) => {
    try {
        const { patientName, patientEmail, patientPhone, doctorName, serviceName, appointmentDate, appointmentTime, notes } = appointmentDetails;

        // Fetch all active appointment managers from database
        const { pool } = require('../config/database');
        const [managers] = await pool.query(`
            SELECT email FROM users 
            WHERE role = 'appointment_manager' AND is_active = TRUE
        `);

        if (managers.length === 0) {
            console.log('⚠️ No active appointment managers found');
            return { success: false, message: 'No active managers' };
        }

        const managerEmails = managers.map(m => m.email).join(', ');

        const mailOptions = {
            from: `"MuscloNeuroRehab" <${process.env.MAIL_USER}>`,
            to: managerEmails,
            subject: 'New Appointment Booking - Action Required',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                        }
                        .header {
                            background-color: #7CC339;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            
                        }
                        .appointment-box {
                            background-color: #f0f8ff;
                            border-left: 4px solid #7CC339;
                            padding: 20px;
                            margin: 20px 0;
                            
                        }
                        .detail-row {
                            display: flex;
                            margin: 10px 0;
                            padding: 8px 0;
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .detail-label {
                            font-weight: bold;
                            color: #7CC339;
                            width: 140px;
                        }
                        .detail-value {
                            color: #333;
                        }
                        .action-required {
                            background-color: #fff3cd;
                            border-left: 4px solid #ffc107;
                            padding: 15px;
                            margin: 20px 0;
                            
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>MuscloNeuroRehab</h1>
                            <p>New Appointment Notification</p>
                        </div>
                        <div class="content">
                            <h2>New Appointment Received</h2>
                            <p>A new appointment has been booked and requires your confirmation.</p>
                            
                            <div class="action-required">
                                <strong>⚠️ Action Required:</strong> Please review and confirm this appointment in the admin panel.
                            </div>
                            
                            <div class="appointment-box">
                                <h3>Patient Information</h3>
                                <div class="detail-row">
                                    <div class="detail-label">Name:</div>
                                    <div class="detail-value">${patientName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Email:</div>
                                    <div class="detail-value">${patientEmail}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Phone:</div>
                                    <div class="detail-value">${patientPhone}</div>
                                </div>
                                
                                <h3 style="margin-top: 20px;">Appointment Details</h3>
                                <div class="detail-row">
                                    <div class="detail-label">Doctor:</div>
                                    <div class="detail-value">${doctorName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Service:</div>
                                    <div class="detail-value">${serviceName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Date:</div>
                                    <div class="detail-value">${new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Time:</div>
                                    <div class="detail-value">${appointmentTime}</div>
                                </div>
                                ${notes ? `
                                <div class="detail-row">
                                    <div class="detail-label">Notes:</div>
                                    <div class="detail-value">${notes}</div>
                                </div>
                                ` : ''}
                            </div>
                            
                            <p>Please log in to the admin panel to confirm or manage this appointment.</p>
                            
                            <p>Best regards,<br><strong>MuscloNeuroRehab System</strong></p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; ${new Date().getFullYear()} MuscloNeuroRehab. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Appointment notification sent to managers:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending appointment manager notification:', error);
        throw error;
    }
};

// Send appointment status update to patient
const sendAppointmentStatusUpdateEmail = async (patientEmail, appointmentDetails, newStatus) => {
    try {
        const { patientName, doctorName, serviceName, appointmentDate, appointmentTime } = appointmentDetails;

        const statusConfig = {
            confirmed: { color: '#28a745', label: 'Confirmed', icon: '✅' },
            completed: { color: '#17a2b8', label: 'Completed', icon: '✔️' },
            cancelled: { color: '#dc3545', label: 'Cancelled', icon: '❌' }
        };

        const status = statusConfig[newStatus] || { color: '#ffc107', label: newStatus, icon: '📌' };

        const mailOptions = {
            from: `"MuscloNeuroRehab" <${process.env.MAIL_USER}>`,
            to: patientEmail,
            subject: `Appointment ${status.label} - MuscloNeuroRehab`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                        }
                        .header {
                            background-color: #1289BF;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            
                        }
                        .status-banner {
                            background-color: ${status.color};
                            color: white;
                            padding: 15px;
                            text-align: center;
                            
                            margin: 20px 0;
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .appointment-box {
                            background-color: #f0f8ff;
                            border-left: 4px solid #1289BF;
                            padding: 20px;
                            margin: 20px 0;
                            
                        }
                        .detail-row {
                            display: flex;
                            margin: 10px 0;
                            padding: 8px 0;
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .detail-label {
                            font-weight: bold;
                            color: #1289BF;
                            width: 140px;
                        }
                        .detail-value {
                            color: #333;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>MuscloNeuroRehab</h1>
                            <p>Appointment Status Update</p>
                        </div>
                        <div class="content">
                            <h2>Hello ${patientName},</h2>
                            
                            <div class="status-banner">
                                ${status.icon} Your appointment has been ${status.label}
                            </div>
                            
                            <p>Here are your appointment details:</p>
                            
                            <div class="appointment-box">
                                <div class="detail-row">
                                    <div class="detail-label">Doctor:</div>
                                    <div class="detail-value">${doctorName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Service:</div>
                                    <div class="detail-value">${serviceName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Date:</div>
                                    <div class="detail-value">${new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Time:</div>
                                    <div class="detail-value">${appointmentTime}</div>
                                </div>
                            </div>
                            
                            ${newStatus === 'confirmed' ? '<p>We look forward to seeing you at your scheduled appointment time.</p>' : ''}
                            ${newStatus === 'completed' ? '<p>Thank you for visiting MuscloNeuroRehab. We hope you had a positive experience.</p>' : ''}
                            ${newStatus === 'cancelled' ? '<p>If you would like to reschedule, please contact us or book a new appointment.</p>' : ''}
                            
                            <p>If you have any questions, please feel free to contact us.</p>
                            
                            <p>Best regards,<br><strong>MuscloNeuroRehab Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; ${new Date().getFullYear()} MuscloNeuroRehab. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Status update email sent to patient:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending status update email:', error);
        throw error;
    }
};

// Send appointment status update notification to managers
const sendManagerStatusUpdateNotification = async (appointmentDetails, newStatus) => {
    try {
        const { patientName, patientEmail, doctorName, serviceName, appointmentDate, appointmentTime } = appointmentDetails;

        // Fetch all active appointment managers from database
        const { pool } = require('../config/database');
        const [managers] = await pool.query(`
            SELECT email FROM users 
            WHERE role = 'appointment_manager' AND is_active = TRUE
        `);

        if (managers.length === 0) {
            console.log('⚠️ No active appointment managers found');
            return { success: false, message: 'No active managers' };
        }

        const managerEmails = managers.map(m => m.email).join(', ');

        const statusConfig = {
            confirmed: { color: '#28a745', label: 'Confirmed' },
            completed: { color: '#17a2b8', label: 'Completed' },
            cancelled: { color: '#dc3545', label: 'Cancelled' }
        };

        const status = statusConfig[newStatus] || { color: '#ffc107', label: newStatus };

        const mailOptions = {
            from: `"MuscloNeuroRehab" <${process.env.MAIL_USER}>`,
            to: managerEmails,
            subject: `Appointment ${status.label} - ${patientName}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                        }
                        .header {
                            background-color: #7CC339;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            
                        }
                        .status-banner {
                            background-color: ${status.color};
                            color: white;
                            padding: 15px;
                            text-align: center;
                            
                            margin: 20px 0;
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .appointment-box {
                            background-color: #f0f8ff;
                            border-left: 4px solid #7CC339;
                            padding: 20px;
                            margin: 20px 0;
                            
                        }
                        .detail-row {
                            display: flex;
                            margin: 10px 0;
                            padding: 8px 0;
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .detail-label {
                            font-weight: bold;
                            color: #7CC339;
                            width: 140px;
                        }
                        .detail-value {
                            color: #333;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>MuscloNeuroRehab</h1>
                            <p>Appointment Status Update</p>
                        </div>
                        <div class="content">
                            <h2>Appointment Status Changed</h2>
                            
                            <div class="status-banner">
                                Status: ${status.label}
                            </div>
                            
                            <div class="appointment-box">
                                <h3>Patient Information</h3>
                                <div class="detail-row">
                                    <div class="detail-label">Name:</div>
                                    <div class="detail-value">${patientName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Email:</div>
                                    <div class="detail-value">${patientEmail}</div>
                                </div>
                                
                                <h3 style="margin-top: 20px;">Appointment Details</h3>
                                <div class="detail-row">
                                    <div class="detail-label">Doctor:</div>
                                    <div class="detail-value">${doctorName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Service:</div>
                                    <div class="detail-value">${serviceName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Date:</div>
                                    <div class="detail-value">${new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Time:</div>
                                    <div class="detail-value">${appointmentTime}</div>
                                </div>
                            </div>
                            
                            <p>This is a notification that the appointment status has been updated to <strong>${status.label}</strong>.</p>
                            
                            <p>Best regards,<br><strong>MuscloNeuroRehab System</strong></p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; ${new Date().getFullYear()} MuscloNeuroRehab. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Status update notification sent to managers:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending manager status update notification:', error);
        throw error;
    }
};

// Send appointment reschedule notification to patient
const sendAppointmentRescheduleEmail = async (patientEmail, appointmentDetails, oldDate, oldTime) => {
    try {
        const { patientName, doctorName, serviceName, appointmentDate, appointmentTime } = appointmentDetails;

        const mailOptions = {
            from: `"MuscloNeuroRehab" <${process.env.MAIL_USER}>`,
            to: patientEmail,
            subject: 'Appointment Rescheduled - MuscloNeuroRehab',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                        }
                        .header {
                            background-color: #1289BF;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            
                        }
                        .reschedule-banner {
                            background-color: #ff9800;
                            color: white;
                            padding: 15px;
                            text-align: center;
                            
                            margin: 20px 0;
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .appointment-box {
                            background-color: #f0f8ff;
                            border-left: 4px solid #1289BF;
                            padding: 20px;
                            margin: 20px 0;
                            
                        }
                        .comparison {
                            display: flex;
                            justify-content: space-between;
                            margin: 20px 0;
                        }
                        .old-schedule, .new-schedule {
                            flex: 1;
                            padding: 15px;
                            
                            margin: 0 5px;
                        }
                        .old-schedule {
                            background-color: #ffebee;
                            border-left: 4px solid #dc3545;
                        }
                        .new-schedule {
                            background-color: #e8f5e9;
                            border-left: 4px solid #28a745;
                        }
                        .detail-row {
                            display: flex;
                            margin: 10px 0;
                            padding: 8px 0;
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .detail-label {
                            font-weight: bold;
                            color: #1289BF;
                            width: 140px;
                        }
                        .detail-value {
                            color: #333;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>MuscloNeuroRehab</h1>
                            <p>Appointment Rescheduled</p>
                        </div>
                        <div class="content">
                            <h2>Hello ${patientName},</h2>
                            
                            <div class="reschedule-banner">
                                📅 Your appointment has been rescheduled
                            </div>
                            
                            <div class="comparison">
                                <div class="old-schedule">
                                    <h3 style="margin-top: 0; color: #dc3545;">Previous Schedule</h3>
                                    <p><strong>Date:</strong> ${new Date(oldDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Time:</strong> ${oldTime}</p>
                                </div>
                                <div class="new-schedule">
                                    <h3 style="margin-top: 0; color: #28a745;">New Schedule</h3>
                                    <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Time:</strong> ${appointmentTime}</p>
                                </div>
                            </div>
                            
                            <div class="appointment-box">
                                <h3>Appointment Details</h3>
                                <div class="detail-row">
                                    <div class="detail-label">Doctor:</div>
                                    <div class="detail-value">${doctorName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Service:</div>
                                    <div class="detail-value">${serviceName}</div>
                                </div>
                            </div>
                            
                            <p>Please make note of the new date and time. We look forward to seeing you at your rescheduled appointment.</p>
                            
                            <p>If you have any questions or need to make further changes, please contact us.</p>
                            
                            <p>Best regards,<br><strong>MuscloNeuroRehab Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; ${new Date().getFullYear()} MuscloNeuroRehab. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Reschedule email sent to patient:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending reschedule email:', error);
        throw error;
    }
};

// Send appointment reschedule notification to managers
const sendManagerRescheduleNotification = async (appointmentDetails, oldDate, oldTime) => {
    try {
        const { patientName, patientEmail, doctorName, serviceName, appointmentDate, appointmentTime } = appointmentDetails;

        // Fetch all active appointment managers from database
        const { pool } = require('../config/database');
        const [managers] = await pool.query(`
            SELECT email FROM users 
            WHERE role = 'appointment_manager' AND is_active = TRUE
        `);

        if (managers.length === 0) {
            console.log('⚠️ No active appointment managers found');
            return { success: false, message: 'No active managers' };
        }

        const managerEmails = managers.map(m => m.email).join(', ');

        const mailOptions = {
            from: `"MuscloNeuroRehab" <${process.env.MAIL_USER}>`,
            to: managerEmails,
            subject: `Appointment Rescheduled - ${patientName}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f9f9f9;
                        }
                        .header {
                            background-color: #7CC339;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            
                        }
                        .reschedule-banner {
                            background-color: #ff9800;
                            color: white;
                            padding: 15px;
                            text-align: center;
                            
                            margin: 20px 0;
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .appointment-box {
                            background-color: #f0f8ff;
                            border-left: 4px solid #7CC339;
                            padding: 20px;
                            margin: 20px 0;
                            
                        }
                        .comparison {
                            display: flex;
                            justify-content: space-between;
                            margin: 20px 0;
                        }
                        .old-schedule, .new-schedule {
                            flex: 1;
                            padding: 15px;
                            
                            margin: 0 5px;
                        }
                        .old-schedule {
                            background-color: #ffebee;
                            border-left: 4px solid #dc3545;
                        }
                        .new-schedule {
                            background-color: #e8f5e9;
                            border-left: 4px solid #28a745;
                        }
                        .detail-row {
                            display: flex;
                            margin: 10px 0;
                            padding: 8px 0;
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .detail-label {
                            font-weight: bold;
                            color: #7CC339;
                            width: 140px;
                        }
                        .detail-value {
                            color: #333;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>MuscloNeuroRehab</h1>
                            <p>Appointment Rescheduled</p>
                        </div>
                        <div class="content">
                            <h2>Appointment Rescheduled</h2>
                            
                            <div class="reschedule-banner">
                                📅 Schedule Updated
                            </div>
                            
                            <div class="appointment-box">
                                <h3>Patient Information</h3>
                                <div class="detail-row">
                                    <div class="detail-label">Name:</div>
                                    <div class="detail-value">${patientName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Email:</div>
                                    <div class="detail-value">${patientEmail}</div>
                                </div>
                                
                                <h3 style="margin-top: 20px;">Appointment Details</h3>
                                <div class="detail-row">
                                    <div class="detail-label">Doctor:</div>
                                    <div class="detail-value">${doctorName}</div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-label">Service:</div>
                                    <div class="detail-value">${serviceName}</div>
                                </div>
                            </div>
                            
                            <div class="comparison">
                                <div class="old-schedule">
                                    <h3 style="margin-top: 0; color: #dc3545;">Previous Schedule</h3>
                                    <p><strong>Date:</strong> ${new Date(oldDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Time:</strong> ${oldTime}</p>
                                </div>
                                <div class="new-schedule">
                                    <h3 style="margin-top: 0; color: #28a745;">New Schedule</h3>
                                    <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Time:</strong> ${appointmentTime}</p>
                                </div>
                            </div>
                            
                            <p>This appointment has been rescheduled. The patient has been notified of the change.</p>
                            
                            <p>Best regards,<br><strong>MuscloNeuroRehab System</strong></p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; ${new Date().getFullYear()} MuscloNeuroRehab. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Reschedule notification sent to managers:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending manager reschedule notification:', error);
        throw error;
    }
};

module.exports = {
    sendOTPEmail,
    sendAppointmentBookingEmail,
    sendAppointmentManagerNotification,
    sendAppointmentStatusUpdateEmail,
    sendManagerStatusUpdateNotification,
    sendAppointmentRescheduleEmail,
    sendManagerRescheduleNotification
};
