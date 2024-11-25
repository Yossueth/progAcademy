const express = require("express");
const router = express.Router();
const Perfiles_Controller = require("../controllers/perfiles_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", Perfiles_Controller.get_all_Perfiles); // Obtener todos los Perfiles
router.post("/", Perfiles_Controller.post_Perfiles); // Agregar Perfiles
router.put("/:id", Perfiles_Controller.put_Perfiles); //Edita a los Perfiles
router.delete("/:id", Perfiles_Controller.delete_Perfiles); //eliminar al Perfiles
module.exports = router;