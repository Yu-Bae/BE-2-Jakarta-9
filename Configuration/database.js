// Configuration/database.js
/* const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kos_revou',
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection; */


// Configuration/database.js
const Sequelize = require('sequelize');

const db = new Sequelize('kos_revou', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // sesuaikan dengan jenis database yang Anda gunakan
});

// Uji koneksi ke database
db.authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil.');
  })
  .catch(err => {
    console.error('Gagal terkoneksi ke database:', err);
  });

module.exports = db;
