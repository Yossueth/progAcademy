const express = require("express");
const router = express.Router();
const Pagos_Controller = require("../controllers/pagos_controllers"); // Importar el controlador

// Definir las rutas
router.get("/", Pagos_Controller.get_all_Pagos); // Obtener todos los Pagos
router.post("/", Pagos_Controller.post_Pagos); // Agregar Pagos
router.put("/:id", Pagos_Controller.put_Pagos); //Edita a los Pagos
router.delete("/:id", Pagos_Controller.delete_Pagos); //eliminar al Pagos
module.exports = router;