const { Categorias } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_Categorias = async (req, res) => {
  try {
    const categoria = await Categorias.findAll();
    res.status(200).json(categoria);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener los Categorias." });
  }
};

//----------------------Post------------------------//

const post_Categorias = async (req, res) => {
  try {
    const { nombre_categoria } = req.body;
    const categoria = await Categorias.create({
      nombre_categoria,
    });
    res.status(201).json(categoria);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear al Categorias" });
  }
};

//----------------------Put------------------------//

const put_Categorias = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_categoria } = req.body;

    const categoria = await Categorias.findByPk(id);
    if (!categoria)
      return res.status(404).json({ error: "Categorias no encontrado" });

    await categoria.update({
      nombre_categoria,
    });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: "error al actualizar al Categorias." });
  }
};

//----------------------Delete------------------------//

const delete_Categorias = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categorias.findByPk(id);
    if (!categoria)
      return res.status(404).json({ error: "Categorias no encontrado" });

    await categoria.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar al Categorias." });
  }
};

module.exports = {
  get_all_Categorias,
  post_Categorias,
  put_Categorias,
  delete_Categorias,
};
