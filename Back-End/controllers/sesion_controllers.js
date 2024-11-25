const { SesionActiva } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_SesionActiva = async (req, res) => {
  try {
    const sesion = await SesionActiva.findAll();
    res.status(200).json(sesion);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener la sesion." });
  }
};

//----------------------Post------------------------//

const post_SesionActiva = async (req, res) => {
  try {
    const { fecha_creacion, fecha_expiracion, usuario_id } = req.body;
    const sesion = await SesionActiva.create({
      fecha_creacion,
      fecha_expiracion,
      usuario_id,
    });
    res.status(201).json(sesion);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear al sesion" });
  }
};

//----------------------Put------------------------//

const put_SesionActiva = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_creacion, fecha_expiracion, usuario_id } = req.body;

    const sesion = await SesionActiva.findByPk(id);
    if (!sesion) return res.status(404).json({ error: "sesion no encontrado" });

    await curso.update({
      fecha_creacion,
      fecha_expiracion,
      usuario_id,
    });
    res.status(200).json(sesion);
  } catch (error) {
    res.status(500).json({ error: "error al actualizar al sesion." });
  }
};

//----------------------Delete------------------------//

const delete_SesionActiva = async (req, res) => {
  try {
    const { id } = req.params;

    const sesion = await SesionActiva.findByPk(id);
    if (!sesion) return res.status(404).json({ error: "sesion no encontrado" });

    await sesion.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar al sesion." });
  }
};

module.exports = {
  get_all_SesionActiva,
  post_SesionActiva,
  put_SesionActiva,
  delete_SesionActiva,
};
