const forgotPasswordService = require('../services/ForgotPasswordService');

exports.requestResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const { id, token } = await forgotPasswordService.createForgotPassword(email);
        res.status(200).json({
            status: 200,
            email,
            token,
            message: 'Token password telah dikirim ke email Anda'
        }); 
    } catch (error) {
        res.status(400).json({
            status: 400, 
            message: 'Gagal membuat forgot password', 
            error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, email, newPassword } = req.body;
        const result = await forgotPasswordService.resetPassword(token, email, newPassword);
        res.status(200).json({
            status: 200, 
            message: 'Password berhasil direset',
            result});
    } catch (error) {
        res.status(400).json({ 
            status: 400,
            message: 'Gagal mereset password', 
            error: error.message 
        });
    }
};