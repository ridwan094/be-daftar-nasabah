const { DaftarNasabah } = require('../models');

exports.createDaftarNasabah = async (nasabahData) => {
    return await DaftarNasabah.create(nasabahData);
};

exports.findDaftarNasabahById = async (id) => {
    return await DaftarNasabah.findByPk(id);
};

exports.findDaftarNasabahByUsername = async (username) => {
    return await DaftarNasabah.findOne({ where: { username } });
};

exports.findAllDaftarNasabah = async () => {
    return await DaftarNasabah.findAll();
};

exports.updateDaftarNasabah = async (id, data) => {
    return await DaftarNasabah.update(data, { where: { id }, returning: true });
};

exports.deleteDaftarNasabah = async (id) => {
    return await DaftarNasabah.destroy({ where: { id } });
};

exports.findDaftarNasabahByEmail = async (email) => {
    return await DaftarNasabah.findOne({ where: { email }});
};