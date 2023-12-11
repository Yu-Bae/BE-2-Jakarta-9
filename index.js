// Index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registrasiRoutes = require('./Routes/registrasiRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const db = require('./Configuration/dbConfig'); // Import file konfigurasi database

const app = express();
const port = 7900;

app.use(cors());
app.use(bodyParser.json());

// Gunakan rute registrasi
app.use('/api', registrasiRoutes);

// Gunakan rute login
app.use('/api', loginRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
