const express = require('express');
const { iniciarsesion, registroUsers, get_all_usuarios } = require('../controllers/authController');
const router = express.Router();

router.get("/", get_all_usuarios)
router.post('/registro', registroUsers);
// Ruta para iniciar sesión
router.post('/login', iniciarsesion);

module.exports = router;