const express = require("express");
const router = express.Router();
const Especialidad_Controller = require("../controllers/especialidad_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", Especialidad_Controller.get_all_Especialidad); // Obtener todos los Especialidad
router.post("/", Especialidad_Controller.post_Especialidad); // Agregar Especialidad
router.put("/:id", Especialidad_Controller.put_Especialidad); //Edita a los Especialidad
router.delete("/:id", Especialidad_Controller.delete_Especialidad); //eliminar al Especialidad
module.exports = router;