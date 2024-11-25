const express = require('express');
const { iniciarsesion } = require('../controllers/authController');
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', iniciarsesion);

module.exports = router;