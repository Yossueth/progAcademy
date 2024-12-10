const express = require('express');
const { iniciarsesion, registroUsers, get_all_usuarios , patch_Usuarios, delete_Usuarios} = require('../controllers/authController');
const router = express.Router();

router.get("/", get_all_usuarios)
router.post('/registro', registroUsers);
router.post('/login', iniciarsesion);
router.delete("/:id", delete_Usuarios); 
router.patch("/:id", patch_Usuarios)

module.exports = router;
