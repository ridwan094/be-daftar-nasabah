const express = require('express');
const daftarNasabahRoutes = require('./daftarNasabah');

const router = express.Router();

router.use('/api', daftarNasabahRoutes);

module.exports = router;
