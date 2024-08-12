const express = require('express');
const router = express.Router();
const daftarNasabahController = require('../controllers/daftarNasabahController');

router.post('/nasabah/register', daftarNasabahController.register);
router.post('/login', daftarNasabahController.login);
router.get('/nasabah/all', daftarNasabahController.getAllDaftarNasabah);
router.get('/nasabah/:id', daftarNasabahController.getDaftarNasabahById);
router.put('/nasabah/:id', daftarNasabahController.updateDaftarNasabah);
router.delete('/nasabah/:id', daftarNasabahController.deleteDaftarNasabah);

module.exports = router;
