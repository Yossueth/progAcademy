const { solicitudes } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_solicitudes = async (req, res) => {
  try {
    const solicitud = await solicitudes.findAll();
    res.status(200).json(solicitud);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener la solicitud." });
  }
};

//----------------------Post------------------------//

const post_solicitudes = async (req, res) => {
  try {
    const { usuario_id, fecha_solicitud, estado } = req.body;
    const solicitud = await solicitudes.create({
      usuario_id,
      fecha_solicitud,
      estado,
    });
    res.status(201).json(solicitud);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear al solicitud" });
  }
};

//----------------------Put------------------------//

const put_solicitudes = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, fecha_solicitud, estado } = req.body;

    const solicitud = await solicitudes.findByPk(id);
    if (!solicitud)
      return res.status(404).json({ error: "solicitud no encontrado" });

    await curso.update({
      usuario_id,
      fecha_solicitud,
      estado,
    });
    res.status(200).json(solicitud);
  } catch (error) {
    res.status(500).json({ error: "error al actualizar al solicitud." });
  }
};

//----------------------Delete------------------------//

const delete_solicitudes = async (req, res) => {
  try {
    const { id } = req.params;

    const solicitud = await solicitudes.findByPk(id);
    if (!solicitud)
      return res.status(404).json({ error: "solicitud no encontrado" });

    await solicitud.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar al solicitud." });
  }
};

module.exports = {
  get_all_solicitudes,
  post_solicitudes,
  put_solicitudes,
  delete_solicitudes,
};
