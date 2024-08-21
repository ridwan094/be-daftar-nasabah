const express = require('express');
const router = express.Router();
const daftarNasabahController = require('../controllers/daftarNasabahController');
const authorize = require('../middleware/authorize');
const authenticateJWT = require('../middleware/authenticateJWT');

// routes untuk nasabah
router.post('/nasabah/register', daftarNasabahController.register);
router.post('/login', daftarNasabahController.login);
router.put('/nasabah/:id', authenticateJWT, authorize(['Nasabah', 'Admin']), daftarNasabahController.updateDaftarNasabah);

// routes untuk admin
router.get('/nasabah/all', authenticateJWT, authorize('Admin'), daftarNasabahController.getAllDaftarNasabah);
router.get('/nasabah/:id', authenticateJWT, authorize(['Admin', 'Nasabah', 'Operator']), daftarNasabahController.getDaftarNasabahById);
router.put('/admin/nasabah/:id', authenticateJWT, authorize('Admin'), daftarNasabahController.updateDaftarNasabah);
router.delete('/nasabah/:id', authenticateJWT, authorize('Admin'), daftarNasabahController.deleteDaftarNasabah);

module.exports = router;