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

// Send contact form email
const sendContactEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
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

        const recipientEmail = ['info@musculoneurorehab.com', 'musculoneurorehab@gmail.com']

        console.log('📧 Sending contact form email to:', recipientEmail);

        // Email to hospital
        const hospitalMailOptions = {
            from: process.env.MAIL_USER,
            to: recipientEmail,
            subject: `Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1289BF; border-bottom: 2px solid #7CC339; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                    </div>
                    <div style="margin: 20px 0;">
                        <h3 style="color: #333;">Message:</h3>
                        <p style="line-height: 1.6; color: #555;">${message}</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #888; font-size: 12px;">
                        This email was sent from the MuscloNeuroRehab contact form.
                    </p>
                </div>
            `
        };

        // Auto-reply email to user
        const userMailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Thank you for contacting MuscloNeuroRehab',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1289BF; border-bottom: 2px solid #7CC339; padding-bottom: 10px;">
                        Thank You for Contacting Us
                    </h2>
                    <p style="line-height: 1.6; color: #555;">Dear ${name},</p>
                    <p style="line-height: 1.6; color: #555;">
                        Thank you for reaching out to MuscloNeuroRehab. We have received your message and 
                        our team will get back to you within 24 hours.
                    </p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
                        <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                        <p style="line-height: 1.6; color: #555;">${message}</p>
                    </div>
                    <div style="background-color: #1289BF; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Contact Information</h3>
                        <p style="margin: 5px 0;">📍 Plot number 114 Ground floor, Pocket 1 Jasola, Near DAV school opposite Police park, New Delhi, Delhi - 110025</p>
                        <p style="margin: 5px 0;">📞 +91 8882270509</p>
                        <p style="margin: 5px 0;">📧 info@musculoneurorehab.com</p>
                    </div>
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
            message: 'Your message has been sent successfully. We will get back to you soon!'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later or contact us directly.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    sendContactEmail
};
