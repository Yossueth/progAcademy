const { Valoraciones } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_Valoraciones = async (req, res) => {
  try {
    const valoracion = await Valoraciones.findAll();
    res.status(200).json(valoracion);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener las Valoraciones." });
  }
};

//----------------------Post------------------------//

const post_Valoraciones = async (req, res) => {
  try {
    const { calificacion, comentario, fecha_valoracion, usuario_id, curso_id } =
      req.body;
    const valoracion = await Valoraciones.create({
      calificacion,
      comentario,
      fecha_valoracion,
      usuario_id,
      curso_id,
    });
    res.status(201).json(valoracion);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear la Valoraciones" });
  }
};

//----------------------Put------------------------//

const put_Valoraciones = async (req, res) => {
  try {
    const { id } = req.params;
    const { calificacion, comentario, fecha_valoracion, usuario_id, curso_id } =
      req.body;

    const valoracion = await Valoraciones.findByPk(id);
    if (!valoracion)
      return res.status(404).json({ error: "Valoraciones no encontrado" });

    await curso.update({
      calificacion,
      comentario,
      fecha_valoracion,
      usuario_id,
      curso_id,
    });
    res.status(200).json(valoracion);
  } catch (error) {
    res.status(500).json({ error: "error al actualizar al solicitud." });
  }
};

//----------------------Delete------------------------//

const delete_Valoraciones = async (req, res) => {
  try {
    const { id } = req.params;

    const valoracion = await Valoraciones.findByPk(id);
    if (!valoracion)
      return res.status(404).json({ error: "Valoraciones no encontrado" });

    await valoracion.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar la Valoraciones." });
  }
};

module.exports = {
  get_all_Valoraciones,
  post_Valoraciones,
  put_Valoraciones,
  delete_Valoraciones,
};
