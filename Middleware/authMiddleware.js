const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Sesuaikan dengan struktur proyek Anda

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Token tidak valid. Akses ditolak.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: 'Token tidak valid.' });
  }
};
