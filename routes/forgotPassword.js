const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');

router.post('/nasabah/forgot-password', forgotPasswordController.requestResetPassword);
router.post('/nasabah/reset-password', forgotPasswordController.resetPassword);

module.exports = router;