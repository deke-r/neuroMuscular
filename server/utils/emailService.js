const nodemailer = require('nodemailer');
require('dotenv').config();

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
            from: `"PMR Hospital" <${process.env.MAIL_USER}>`,
            to: email,
            subject: 'Password Reset OTP - PMR Hospital',
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
                            border-radius: 5px 5px 0 0;
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            border-radius: 0 0 5px 5px;
                        }
                        .otp-box {
                            background-color: #f0f8ff;
                            border: 2px dashed #1289BF;
                            padding: 20px;
                            text-align: center;
                            margin: 20px 0;
                            border-radius: 5px;
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
                            <h1>PMR Hospital</h1>
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
                            
                            <p class="warning">⚠️ Never share this OTP with anyone. PMR Hospital staff will never ask for your OTP.</p>
                            
                            <p>Best regards,<br><strong>PMR Hospital Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; ${new Date().getFullYear()} PMR Hospital. All rights reserved.</p>
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

module.exports = {
    sendOTPEmail
};
