# Email Configuration for Contact Form

To enable the contact form email functionality, you need to add the following environment variables to your `.env` file in the server directory:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_RECIPIENT=info@musculoneurorehab.com
```

## Setting up Gmail App Password

1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Use this password in the `EMAIL_PASSWORD` variable

## Alternative Email Services

You can use other email services by changing the `EMAIL_SERVICE` variable:
- `gmail` - Gmail
- `outlook` - Outlook/Hotmail
- `yahoo` - Yahoo Mail
- Or configure custom SMTP settings in the controller

## Testing

After adding the credentials:
1. Restart the server
2. Fill out the contact form
3. Check that emails are received at the recipient address
4. Verify the user receives a confirmation email
