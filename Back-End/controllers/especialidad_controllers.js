const { Especialidad } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_Especialidad = async (req, res) => {
  try {
    const especialidad = await Especialidad.findAll();
    res.status(200).json(especialidad);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener los Especialidad." });
  }
};

//----------------------Post------------------------//

const post_Especialidad = async (req, res) => {
  try {
    const { nombre_especialidad } = req.body;
    const especialidad = await Especialidad.create({
      nombre_especialidad,
    });
    res.status(201).json(especialidad);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear al Especialidad" });
  }
};

//----------------------Put------------------------//

const put_Especialidad = async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de la especialidad de los parámetros
    const { nombre_especialidad } = req.body; // Obtén el nuevo nombre de la especialidad

    // Busca la especialidad por su ID
    const especialidad = await Especialidad.findByPk(id);
    if (!especialidad)
      return res.status(404).json({ error: "Especialidad no encontrada" });

    // Actualiza la especialidad
    await especialidad.update({
      nombre_especialidad,
    });

    // Devuelve la especialidad actualizada
    res.status(200).json(especialidad);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la Especialidad." });
  }
};


//----------------------Delete------------------------//

const delete_Especialidad = async (req, res) => {
  try {
    const { id } = req.params;

    const especialidad = await Especialidad.findByPk(id);
    if (!especialidad)
      return res.status(404).json({ error: "Especialidad no encontrado" });

    await especialidad.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar al Especialidad." });
  }
};

module.exports = {
  get_all_Especialidad,
  post_Especialidad,
  put_Especialidad,
  delete_Especialidad,
};
