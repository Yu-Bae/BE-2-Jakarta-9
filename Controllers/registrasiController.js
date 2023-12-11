const bcrypt = require('bcrypt');
const db = require('../Configuration/dbConfig');

const registrasiController = async (req, res) => {
  const userData = req.body;

  try {
    // Enkripsi password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Validasi: Periksa apakah username sudah terdaftar
    db.query('SELECT * FROM user_kos WHERE username = ?', [userData.username], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Registrasi gagal. Silakan coba lagi.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Username sudah terdaftar. Silakan pilih username lain.' });
      }

      // Simpan data pengguna ke database
      db.query('INSERT INTO user_kos SET ?', userData, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Registrasi gagal. Silakan coba lagi.' });
        } else {
          console.log('Data berhasil disimpan!');
          res.status(200).json({ message: 'Registrasi berhasil' });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registrasi gagal. Silakan coba lagi.' });
  }
};

module.exports = registrasiController;
