const { Perfiles } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_Perfiles = async (req, res) => {
  try {
    const perfil = await Perfiles.findAll();
    res.status(200).json(perfil);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener los perfil." });
  }
};

//----------------------Post------------------------//

const post_Perfiles = async (req, res) => {
  try {
    const { usuario_id, biografia, foto_perfil } = req.body;
    const perfil = await Perfiles.create({
      usuario_id,
      biografia,
      foto_perfil,
    });
    res.status(201).json(perfil);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear al perfil" });
  }
};

//----------------------Put------------------------//

const put_Perfiles = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, biografia, foto_perfi } = req.body;

    const perfil = await Perfiles.findByPk(id);
    if (!perfil) return res.status(404).json({ error: "perfil no encontrado" });

    await curso.update({
      usuario_id,
      biografia,
      foto_perfi,
    });
    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ error: "error al actualizar al perfil." });
  }
};

//----------------------Delete------------------------//

const delete_Perfiles = async (req, res) => {
  try {
    const { id } = req.params;

    const perfil = await Perfiles.findByPk(id);
    if (!perfil) return res.status(404).json({ error: "perfil no encontrado" });

    await pago.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar al perfil." });
  }
};

module.exports = {
  get_all_Perfiles,
  post_Perfiles,
  put_Perfiles,
  delete_Perfiles,
};
