const express = require("express");
const router = express.Router();
const Categorias_Controller = require("../controllers/categorias_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", Categorias_Controller.get_all_Categorias); // Obtener todos los Categorias
router.post("/", Categorias_Controller.post_Categorias); // Agregar Categorias
router.put("/:id", Categorias_Controller.put_Categorias); //Edita a los Categorias
router.delete("/:id", Categorias_Controller.delete_Categorias); //eliminar al Categorias
module.exports = router;