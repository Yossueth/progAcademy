const express = require("express");
const router = express.Router();
const solicitudes_Controller = require("../controllers/solicitudes_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", solicitudes_Controller.get_all_solicitudes); // Obtener todos los solicitudes
router.post("/", solicitudes_Controller.post_solicitudes); // Agregar solicitudes
router.put("/:id", solicitudes_Controller.put_solicitudes); //Edita a los solicitudes
router.delete("/:id", solicitudes_Controller.delete_solicitudes); //eliminar al solicitudes
module.exports = router;