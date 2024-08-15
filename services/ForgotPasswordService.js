const forgotPasswordRepository = require('../repositories/forgotPasswordRepository');
const daftarNasabahRepository = require('../repositories/daftarNasabahRepository');
const bcrypt = require('bcryptjs');
const SHA256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');
const { sendResetPasswordEmail } = require('./EmailService');

exports.createForgotPassword = async (email) => {
    const nasabah = await daftarNasabahRepository.findDaftarNasabahByEmail(email);

    if (!nasabah) {
        throw new Error('Nasabah tidak ditemukan');
    }

    const timestamp = Date.now().toString();
    const rawToken = email + timestamp;
    const token = Base64.stringify(SHA256(rawToken));
    
    const expiredAt = new Date(Date.now() + 3600000);

    const forgotPasswordData = {
        token,
        expiredAt,
        nasabahId: nasabah.id
    };

    console.log('Forgot Password Data:', forgotPasswordData);

    const forgotPasswordRecord = await forgotPasswordRepository.createForgotPassword(forgotPasswordData);

    console.log('Forgot Password record created:', forgotPasswordRecord);

    await sendResetPasswordEmail(email, token);

    return { message: 'Link reset password telah dikirim ke email Anda' };
};

exports.resetPassword = async (token, newPassword) => {
    const forgotPassword = await forgotPasswordRepository.findForgotPasswordByToken(token);

    if (!forgotPassword) {
        throw new Error('Token tidak valid');
    }

    if (new Date() > new Date(forgotPassword.expiredAt)) {
        throw new Error('Token telah kadaluarsa');
    }

    const nasabah = await daftarNasabahRepository.findDaftarNasabahById(forgotPassword.nasabahId);
    if (!nasabah) {
        throw new Error('Nasabah tidak ditemukan');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await daftarNasabahRepository.updateDaftarNasabah(nasabah.id, { password: hashedPassword });

    await forgotPasswordRepository.deleteForgotPassword(forgotPassword.id);

    return { message: 'Password berhasil direset' };
};
