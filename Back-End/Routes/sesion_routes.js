const express = require("express");
const router = express.Router();
const sesion_Controller = require("../controllers/sesion_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", sesion_Controller.get_all_SesionActiva); // Obtener todos los sesion
router.post("/", sesion_Controller.post_SesionActiva); // Agregar sesion
router.put("/:id", sesion_Controller.put_SesionActiva); //Edita a los sesion
router.delete("/:id", sesion_Controller.delete_SesionActiva); //eliminar al sesion
module.exports = router;