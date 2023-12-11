// Controllers/userController.js
const db = require('../Configuration/database');
const bcrypt = require('bcrypt');
const User = require('../Models/userModel'); // Import model Sequelize

module.exports = {
  registerUser: async (req, res) => {
    console.log('Menerima permintaan pendaftaran:', req.body);

    const userData = req.body;

    // Validasi data
    if (!userData.username || !userData.password || !userData.email) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    // Validasi panjang minimum kata sandi
    if (userData.password.length < 6) {
      return res.status(400).json({ error: 'Panjang kata sandi minimal 6 karakter' });
    }

    try {
      // Hash kata sandi sebelum disimpan ke database
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Ganti kata sandi dengan hasil hash
      userData.password = hashedPassword;

      // Simpan data ke database menggunakan Sequelize
      const newUser = await User.create(userData);

      console.log('Pendaftaran berhasil:', newUser);
      return res.status(201).json({ success: 'Pendaftaran berhasil' });
    } catch (error) {
      console.error('Gagal mendaftar:', error);
      return res.status(500).json({ error: 'Gagal mendaftar' });
    }
  },
};
