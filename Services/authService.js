// Services/authService.js
const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (userId) => {
    const token = jwt.sign({ userId }, 'secret_key', { expiresIn: '1h' });
    return token;
  },
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, 'secret_key');
      return decoded;
    } catch (error) {
      throw new Error('Token tidak valid');
    }
  },
};