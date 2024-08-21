const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});

const sendResetPasswordEmail = async (email, token) => {
    const mailOptions = {
        from: 'info@demomailtrap.com',
        to: "ridwansaefudin025@gmail.com",
        subject: 'Reset Password',
        text: `Here is your password reset token: ${token}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = { sendResetPasswordEmail };
