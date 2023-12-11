// Configuration/dbConfig.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kos_revou',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Mencoba membuat koneksi
db.getConnection()
  .then(connection => {
    console.log('Database connected!');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

module.exports = db;
