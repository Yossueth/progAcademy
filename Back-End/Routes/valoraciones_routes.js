const express = require("express");
const router = express.Router();
const valoraciones_Controller = require("../controllers/valoraciones_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", valoraciones_Controller.get_all_Valoraciones); // Obtener todos los valoraciones
router.post("/", valoraciones_Controller.post_Valoraciones); // Agregar valoraciones
router.put("/:id", valoraciones_Controller.put_Valoraciones); //Edita a los valoraciones
router.delete("/:id", valoraciones_Controller.delete_Valoraciones); //eliminar al valoraciones
module.exports = router;