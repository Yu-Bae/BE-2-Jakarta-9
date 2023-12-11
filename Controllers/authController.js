// Controllers/authController.js
const User = require('../Models/userModel');
const LoginAktivitas = require('../Models/loginAktivitas'); // Sesuaikan dengan nama model yang sesuai di dalam proyek Anda
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../Configuration/database');

// Konfigurasi dotenv
dotenv.config();

async function loginUser(req, res) {
  const { username, password, role } = req.body;

  try {
    // Gantilah ini dengan logika autentikasi yang sesuai dengan aplikasi Anda
    const user = await User.findOne({
      where: {
        username,
        role,
      },
    });

    if (user && user.comparePassword(password)) {
      // Catat aktivitas login ke tabel login_activity
      await LoginAktivitas.create({
        id_user: user.id_user,
        username: user.username,
        password: user.password,
        role: user.role,
      });

      const payload = {
        user: {
          id_user: user.id_user,
          role: user.role,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        res.json({ token, userId: user.id_user, role: user.role });
        console.log('akhirnya berhasil login')
      });
    } else {
      res.status(401).json({ error: 'Username, password, atau role salah.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  loginUser,
};
