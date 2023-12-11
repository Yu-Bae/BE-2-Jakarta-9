// Models/loginModel.js
const db = require('../Configuration/dbConfig');

const userModel = {
  findOne: async (conditions) => {
    try {
      const result = await db.query('SELECT * FROM user_kos WHERE ?', [conditions]);
      return result[0];
    } catch (error) {
      throw error;
    }
  },

  saveLoginActivity: async (userData) => {
    try {
      // Simpan aktivitas login ke dalam tabel login_activity
      await db.query('INSERT INTO login_activity (id_user, username, password, role) VALUES (?, ?, ?, ?)', [
        userData.id_user,
        userData.username,
        userData.password, // Gunakan password asli tanpa hashing jika tidak menggunakan bcrypt
        userData.role,
      ]);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userModel;
