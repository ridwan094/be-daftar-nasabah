const forgotPasswordService = require('../services/ForgotPasswordService');

exports.requestResetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        await forgotPasswordService.createForgotPassword(email);
        const inboxUrl =  `https://mailtrap.io/inboxes/${process.env.MAILTRAP_INBOX_ID}/messages`;
        res.status(200).json({ message: 'Link reset password telah dikirim ke email Anda', inboxLink: inboxUrl });
    } catch (error) {
        console.error('Error during forgot password request:', error);
        res.status(400).json({ message: 'Gagal membuat forgot password', error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const response = await forgotPasswordService.resetPassword(token, newPassword);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error during reset password:', error.message);
        return res.status(400).json({ message: 'Gagal mereset password', error: error.message });
    }
};