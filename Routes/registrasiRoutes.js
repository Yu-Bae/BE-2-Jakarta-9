// Routes/registrasiRoutes.js
const express = require('express');
const registrasiController = require('../Controllers/registrasiController');

const router = express.Router();

router.post('/register', registrasiController);

module.exports = router;
