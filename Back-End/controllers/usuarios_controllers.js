const { Usuarios } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_Usuarios = async (req, res) => {
  try {
    const usuario = await Usuarios.findAll();
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener los Usuarios." });
  }
};

//----------------------Post------------------------//

const post_Usuarios = async (req, res) => {
  try {
    const {
      nombre_usuario,
      apellido,
      correo,
      contrasena,
      fecha_registro,
      rol_id,
      especialidad_id,
    } = req.body;
    const usuario = await Usuarios.create({
      nombre_usuario,
      apellido,
      correo,
      contrasena,
      fecha_registro,
      rol_id,
      especialidad_id,
    });
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear al usuario" });
  }
};

//----------------------Put------------------------//

const put_Usuarios = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_usuario,
      apellido,
      correo,
      contrasena,
      fecha_registro,
      rol_id,
      especialidad_id,
    } = req.body;

    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await usuario.update({
      nombre_usuario,
      apellido,
      correo,
      contrasena,
      fecha_registro,
      rol_id,
      especialidad_id,
    });

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar al usuario." });
  }
};

//----------------------Delete------------------------//

const delete_Usuarios = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuarios.findByPk(id);
    if (!usuario)
      return res.status(404).json({ error: "usuario no encontrado" });

    await usuario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el usuario." });
  }
};

module.exports = {
  get_all_Usuarios,
  post_Usuarios,
  put_Usuarios,
  delete_Usuarios,
};
