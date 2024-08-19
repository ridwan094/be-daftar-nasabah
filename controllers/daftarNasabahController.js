const daftarNasabahService = require('../services/DaftarNasabahService');

exports.register = async (req, res) => {
    try {
        const result = await daftarNasabahService.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.getDaftarNasabahById = async (req, res) => {
    try {
        const result = await daftarNasabahService.getById(req.params.id);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Nasabah not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllDaftarNasabah = async (req, res) => {
    try {
        const result = await daftarNasabahService.getAll();
        res.json(result);
    } catch (err) {
        console.error('Error in getAllDaftarNasabah:', err);
        res.status(500).json({ error: 'Failed to retrieve nasabah' });
    }
};

exports.updateDaftarNasabah = async (req, res) => {
    try {
        const result = await daftarNasabahService.update(req.params.id, req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Nasabah not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteDaftarNasabah = async (req, res) => {
    try {
        const result = await daftarNasabahService.delete(req.params.id);
        if (result) {
            res.json({ message: 'Nasabah deleted successfully' });
        } else {
            res.status(404).json({ error: 'Nasabah not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await daftarNasabahService.login(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
