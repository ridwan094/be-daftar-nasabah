// models/daftar_nasabah.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const DaftarNasabah = sequelize.define('DaftarNasabah', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    no_telp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    jenis_kelamin: {
      type: DataTypes.ENUM('Laki-laki', 'Perempuan'),
      allowNull: false
    },
    usia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Operator', 'Nasabah'),
      defaultValue: 'Nasabah',
      allowNull: false
    }
  }, {
    tableName: 'daftar_nasabah'
  });

  DaftarNasabah.associate = function(models) {
    // Define associations here if needed
  };

  return DaftarNasabah;
};
