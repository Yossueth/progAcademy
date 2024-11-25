const express = require("express");
const router = express.Router();
const usuarios_Controller = require("../controllers/usuarios_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", usuarios_Controller.get_all_Usuarios); // Obtener todos los usuarios
router.post("/", usuarios_Controller.post_Usuarios); // Agregar usuarios
router.put("/:id", usuarios_Controller.put_Usuarios); //Edita a los usuarios
router.delete("/:id", usuarios_Controller.delete_Usuarios); //eliminar al usuarios
module.exports = router;
