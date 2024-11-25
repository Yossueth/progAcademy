const { Pagos } = require("../models"); // Asegúrate de que este nombre coincida con lo que exportas en el archivo de modelos

//----------------------Get------------------------//

const get_all_Pagos = async (req, res) => {
  try {
    const pago = await Pagos.findAll();
    res.status(200).json(pago);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener los Pagos." });
  }
};

//----------------------Post------------------------//

const post_Pagos = async (req, res) => {
  try {
    const { cantidad, fecha_pago, usuario_id, curso_id } = req.body;
    const pago = await Pagos.create({
      cantidad,
      fecha_pago,
      usuario_id,
      curso_id,
    });
    res.status(201).json(pago);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear al Pagos" });
  }
};

//----------------------Put------------------------//

const put_Pagos = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad, fecha_pago, usuario_id, curso_id } = req.body;

    const pago = await Pagos.findByPk(id);
    if (!pago) return res.status(404).json({ error: "Pagos no encontrado" });

    await curso.update({
      cantidad,
      fecha_pago,
      usuario_id,
      curso_id,
    });
    res.status(200).json(pago);
  } catch (error) {
    res.status(500).json({ error: "error al actualizar al Pagos." });
  }
};

//----------------------Delete------------------------//

const delete_Pagos = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await Pagos.findByPk(id);
    if (!pago) return res.status(404).json({ error: "Pagos no encontrado" });

    await pago.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar al Pagos." });
  }
};

module.exports = {
  get_all_Pagos,
  post_Pagos,
  put_Pagos,
  delete_Pagos,
};
