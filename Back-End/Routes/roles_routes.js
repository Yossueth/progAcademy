const express = require("express");
const router = express.Router();
const Roles_Controller = require("../controllers/roles_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", Roles_Controller.get_all_roles); // Obtener todos los Roles
router.post("/", Roles_Controller.post_roles); // Agregar Roles
router.put("/:id", Roles_Controller.put_roles); //Edita a los Roles
router.delete("/:id", Roles_Controller.delete_roles); //eliminar al Roles
module.exports = router;