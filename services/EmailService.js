const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});

const sendResetPasswordEmail = async (email, token) => {
    const mailOptions = {
        from: 'ridwansaefudin97@gmail.com',
        to: email,
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
