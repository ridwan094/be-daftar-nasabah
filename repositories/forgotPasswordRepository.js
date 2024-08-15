const { ForgotPassword } = require('../models');

exports.createForgotPassword = async (data) => {
    return await ForgotPassword.create(data);
};

exports.findForgotPasswordByToken = async (token) => {
    return await ForgotPassword.findOne({ where: { token }});
};

exports.deleteForgotPassword = async (id) => {
    return await ForgotPassword.destroy({ where: { id }});
};