const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const daftarNasabahRepository = require('../repositories/daftarNasabahRepository');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

console.log('SECRET_KEY is not defined');

if (!SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined');
}

exports.register = async (data) => {
    const { username, password, email, no_telp, nik, alamat, jenis_kelamin, usia, role } = data;

    let normalizedGender = '';
    if (jenis_kelamin.toLowerCase() === 'laki-laki' || jenis_kelamin.toLowerCase() === 'l' || jenis_kelamin.toLowerCase() === 'm' || jenis_kelamin.toLowerCase() === 'pria' || jenis_kelamin.toUpperCase() === 'L') {
        normalizedGender = 'Laki-laki';
    } else if (jenis_kelamin.toLowerCase() === 'perempuan' || jenis_kelamin.toLowerCase() === 'p' || jenis_kelamin.toLowerCase() === 'w' || jenis_kelamin.toLowerCase() === 'wanita' || jenis_kelamin.toUpperCase() === 'P') {
        normalizedGender = 'Perempuan';
    } else {
        throw new Error('Anda menginputkan data jenis kelamin yang salah.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan data nasabah
    const nasabah = await daftarNasabahRepository.createDaftarNasabah({
        username,
        password: hashedPassword,
        email,
        no_telp,
        nik,
        alamat,
        jenis_kelamin: normalizedGender,
        usia,
        role: role || 'Nasabah'
    });

    const response = nasabah.toJSON();
    response.usia = `${response.usia} tahun`;

    return response;
};

exports.login = async (data) => {
    const { username, password } = data;
    const user = await daftarNasabahRepository.findDaftarNasabahByUsername(username);
    
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
    return { 
        userId: user.id,
        username: user.username,
        email: user.email,
        no_telp: user.no_telp,
        nik: user.nik,
        alamat: user.alamat,
        jenis_kelamin: user.jenis_kelamin,
        usia: user.usia,
        role: user.role,
        token 
    };
};

exports.getById = async (id) => {
    const nasabah = await daftarNasabahRepository.findDaftarNasabahById(id);

    if (nasabah){
        nasabah.usia = `${nasabah.usia} tahun`;
    }
    return nasabah;
};

exports.getAll = async () => {
    try {
        const nasabahList = await daftarNasabahRepository.findAllDaftarNasabah();
        return nasabahList.map(nasabah => {
            nasabah.usia = `${nasabah.usia} tahun`;
            return nasabah;
        });
    } catch (error) {
        console.error('Error in service getAll:', error);
        throw new Error('Failed to get all nasabah');
    }
};

exports.update = async (id, data) => {
    if (!data.jenis_kelamin) {
        throw new Error('Jenis kelamin harus diisi');
    }

    let normalizedGender = '';
    const gender = data.jenis_kelamin.toLowerCase();
    if (gender === 'laki-laki' || gender === 'l' || gender === 'm' || gender === 'pria' || gender === 'L') {
        normalizedGender = 'Laki-laki';
    } else if (gender === 'perempuan' || gender === 'p' || gender === 'w' || gender === 'wanita' || gender === 'P') {
        normalizedGender = 'Perempuan';
    } else {
        throw new Error('Anda menginputkan data jenis kelamin yang salah.');
    }

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    
    await daftarNasabahRepository.updateDaftarNasabah(id, {
        ...data,
        jenis_kelamin: normalizedGender
    });
    
    const updatedNasabah = await daftarNasabahRepository.findDaftarNasabahById(id);

    updatedNasabah.usia = `${updatedNasabah.usia} tahun`;
    
    return updatedNasabah;
};


exports.delete = async (id) => {
    return await daftarNasabahRepository.deleteDaftarNasabah(id);
};
