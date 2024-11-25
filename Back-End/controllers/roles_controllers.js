const { Roles } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_roles = async (req, res) => {
  try {
    const rol = await Roles.findAll();
    res.status(200).json(rol);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener los roles." });
  }
};

//----------------------Post------------------------//

const post_roles = async (req, res) => {
  try {
    const { nombre_rol } = req.body;
    const rol = await Roles.create({
      nombre_rol,
    });
    res.status(201).json(rol);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear al roles" });
  }
};

//----------------------Put------------------------//

const put_roles = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_rol } = req.body;

    const rol = await Roles.findByPk(id);
    if (!rol) return res.status(404).json({ error: "roles no encontrado" });

    await rol.update({
      nombre_rol,
    });
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ error: "error al actualizar al roles." });
  }
};

//----------------------Delete------------------------//

const delete_roles = async (req, res) => {
  try {
    const { id } = req.params;

    const rol = await Roles.findByPk(id);
    if (!rol) return res.status(404).json({ error: "roles no encontrado" });

    await rol.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar al roles." });
  }
};

module.exports = {
  get_all_roles,
  post_roles,
  put_roles,
  delete_roles,
};
