const express = require("express");
const router = express.Router();
const Cursos_Controller = require("../controllers/cursos_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", Cursos_Controller.get_all_Cursos); // Obtener todos los Cursos
router.post("/", Cursos_Controller.post_Cursos); // Agregar Cursos
router.put("/:id", Cursos_Controller.put_Cursos); //Edita a los Cursos
router.delete("/:id", Cursos_Controller.delete_Cursos); //eliminar al Cursos
module.exports = router;