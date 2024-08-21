'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('daftar_nasabah', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      no_telp: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nik: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('Laki-laki','Perempuan'),
        allowNull: false
      },
      usia: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('Admin', 'Operator', 'Nasabah'),
        defaultValue: 'Nasabah',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('daftar_nasabah');
  }
};