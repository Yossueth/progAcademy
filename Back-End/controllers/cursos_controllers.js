const { Cursos } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_Cursos = async (req, res) => {
  try {
    const curso = await Cursos.findAll();
    res.status(200).json(curso);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener los Cursos." });
  }
};

//----------------------Post------------------------//

const post_Cursos = async (req, res) => {
  try {
    const {
      nombre_curso,
      descripcion,
      categoria_id,
      usuario_id,
      solicitud_id,
      valoraciones_id,
    } = req.body;
    const curso = await Cursos.create({
      nombre_curso,
      descripcion,
      categoria_id,
      usuario_id,
      solicitud_id,
      valoraciones_id,
    });
    res.status(201).json(curso);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear al Cursos" });
  }
};

//----------------------Put------------------------//

const put_Cursos = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_curso,
      descripcion,
      categoria_id,
      usuario_id,
      solicitud_id,
      valoraciones_id,
    } = req.body;

    const curso = await Cursos.findByPk(id);
    if (!curso) return res.status(404).json({ error: "Cursos no encontrado" });

    await curso.update({
      nombre_curso,
      descripcion,
      categoria_id,
      usuario_id,
      solicitud_id,
      valoraciones_id,
    });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: "error al actualizar al Cursos." });
  }
};

//----------------------Delete------------------------//

const delete_Cursos = async (req, res) => {
  try {
    const { id } = req.params;

    const curso = await Cursos.findByPk(id);
    if (!curso) return res.status(404).json({ error: "Cursos no encontrado" });

    await curso.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar al Cursos." });
  }
};

module.exports = {
  get_all_Cursos,
  post_Cursos,
  put_Cursos,
  delete_Cursos,
};
