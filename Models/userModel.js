// Models/userModel.js
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const db = require('../Configuration/database');

const User = db.define('user_kos', {
  id_user: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nama: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jenisKelamin: {
    type: Sequelize.ENUM('Laki-Laki', 'Perempuan'),
    allowNull: false,
  },
  telepon: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM('1', '2'),
    allowNull: false,
  },
}, {
  timestamps: false, // Tambahkan ini untuk menonaktifkan createdAt dan updatedAt
});

// Tambahkan metode comparePassword
User.prototype.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = User;
