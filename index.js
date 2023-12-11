// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const registrasiRoutes = require("./Routes/userRoutes");
const loginRoutes = require("./Routes/authRoutes");
const User = require('./Models/userModel');
const db = require("./Configuration/database"); // Import file konfigurasi database

const app = express();
const port = 7900;
const dotenv = require('dotenv');

dotenv.config()
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Gunakan rute registrasi
app.use("/api", registrasiRoutes);

// Gunakan rute login
app.use("/api", loginRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
