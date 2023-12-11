// Controllers/loginController.js
const bcrypt = require('bcrypt');
const userModel = require('../Models/loginModel');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Lakukan validasi login
    const user = await userModel.findOne({ username });

    if (user) {
      // Memeriksa apakah kata sandi sesuai
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Simpan aktivitas login ke dalam tabel login_activity
        await userModel.saveLoginActivity({
          id_user: user.id_user,
          username: user.username,
          password: user.password, // Gunakan password asli tanpa hashing jika tidak menggunakan bcrypt
          role: user.role,
        });

        // Tentukan dashboard berdasarkan peran
        let dashboardPage;
        if (user.role === '1') {
          dashboardPage = '/dashboard-pemilik.html'; // Sesuaikan dengan path dashboard pemilik Anda
        } else if (user.role === '2') {
          dashboardPage = '/dashboard-penyewa.html'; // Sesuaikan dengan path dashboard penyewa Anda
        } else {
          return res.status(401).json({ message: 'Invalid role' });
        }

        // Kirim respons dengan meredirect ke halaman dashboard yang sesuai
        res.json({ redirect: dashboardPage });
        console.log('Login berhasil, redirect ke:', dashboardPage);
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
        console.log('Login gagal: Kata sandi salah');
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
      console.log('Login gagal: Pengguna tidak ditemukan');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
