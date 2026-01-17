const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
};

// Send ad form appointment email
const sendAdFormEmail = async (req, res) => {
    try {
        const { name, email, phone, service, date, time, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !service || !date || !time) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be filled'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        const transporter = createTransporter();

        const recipientEmail = ['info@musculoneurorehab.com', 'musculoneurorehab@gmail.com'];

        console.log('📧 Sending ad form appointment email to:', recipientEmail);

        // Email to hospital
        const hospitalMailOptions = {
            from: process.env.MAIL_USER,
            to: recipientEmail,
            subject: `New Appointment Request from Ad Landing Page - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1289BF; border-bottom: 2px solid #7CC339; padding-bottom: 10px;">
                        🎯 New Appointment from Ad Landing Page
                    </h2>
                    <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
                        <p style="margin: 0; color: #856404; font-weight: bold;">
                            ⚡ This is a high-priority lead from the advertising campaign!
                        </p>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Patient Information</h3>
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Appointment Details</h3>
                        <p style="margin: 10px 0;"><strong>Service Required:</strong> ${service}</p>
                        <p style="margin: 10px 0;"><strong>Preferred Date:</strong> ${date}</p>
                        <p style="margin: 10px 0;"><strong>Preferred Time:</strong> ${time}</p>
                    </div>
                    ${message ? `
                    <div style="margin: 20px 0;">
                        <h3 style="color: #333;">Additional Information:</h3>
                        <p style="line-height: 1.6; color: #555; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                    </div>
                    ` : ''}
                    <div style="background-color: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;">
                        <p style="margin: 0; color: #155724;">
                            <strong>Action Required:</strong> Please contact this patient as soon as possible to confirm the appointment.
                        </p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #888; font-size: 12px;">
                        This email was sent from the MuscloNeuroRehab Ad Landing Page.
                    </p>
                </div>
            `
        };

        // Auto-reply email to user
        const userMailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Appointment Request Received - MuscloNeuroRehab',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1289BF; border-bottom: 2px solid #7CC339; padding-bottom: 10px;">
                        Thank You for Your Appointment Request
                    </h2>
                    <p style="line-height: 1.6; color: #555;">Dear ${name},</p>
                    <p style="line-height: 1.6; color: #555;">
                        Thank you for choosing MuscloNeuroRehab! We have received your appointment request and 
                        our team will contact you shortly to confirm your appointment.
                    </p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Your Appointment Request Details:</h3>
                        <p style="margin: 10px 0;"><strong>Service:</strong> ${service}</p>
                        <p style="margin: 10px 0;"><strong>Preferred Date:</strong> ${date}</p>
                        <p style="margin: 10px 0;"><strong>Preferred Time:</strong> ${time}</p>
                    </div>
                    <div style="background-color: #d1ecf1; padding: 15px; border-left: 4px solid #0c5460; margin: 20px 0;">
                        <p style="margin: 0; color: #0c5460;">
                            <strong>What's Next?</strong><br>
                            Our team will call you within 24 hours to confirm your appointment and answer any questions you may have.
                        </p>
                    </div>
                    <div style="background-color: #1289BF; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Contact Information</h3>
                        <p style="margin: 5px 0;">📍 Plot number 114 Ground floor, Pocket 1 Jasola, Near DAV school opposite Police park, New Delhi, Delhi - 110025</p>
                        <p style="margin: 5px 0;">📞 +91 8882270509</p>
                        <p style="margin: 5px 0;">📧 info@musculoneurorehab.com</p>
                    </div>
                    <p style="line-height: 1.6; color: #555;">
                        If you have any urgent questions, please feel free to call us directly at +91 8882270509.
                    </p>
                    <p style="line-height: 1.6; color: #555;">
                        Best regards,<br>
                        <strong>MuscloNeuroRehab Team</strong>
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #888; font-size: 12px;">
                        This is an automated response. Please do not reply to this email.
                    </p>
                </div>
            `
        };

        // Send both emails
        console.log('📤 Sending email to hospital:', recipientEmail);
        await transporter.sendMail(hospitalMailOptions);
        console.log('✅ Hospital email sent successfully');

        console.log('📤 Sending auto-reply to user:', email);
        await transporter.sendMail(userMailOptions);
        console.log('✅ User auto-reply sent successfully');

        res.status(200).json({
            success: true,
            message: 'Your appointment request has been submitted successfully. We will contact you soon!'
        });

    } catch (error) {
        console.error('Ad form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit appointment request. Please try again later or contact us directly.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    sendAdFormEmail
};
