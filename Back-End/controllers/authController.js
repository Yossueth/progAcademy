const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config");
const { Usuarios } = require("../models");

const iniciarsesion = async (req, res) => {
  const { username, password } = req.body;

  try {
    //f Buscar el usuario por su nombre de usuario
    const usuario = await Usuarios.findone({ where: { username } });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }
    //f Aqui deberfas comparar la contraseña proporcionada con la almacenada

    const esContrasenaValida = await bcrypt.compare(password, usuario.password); // Asegurate de tener bcrypt instalado

    if (!esContrasenaValida) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }
    //f Gemerar el token JWT
    const token = jwt.sign(
      { id: usuario.id, username: usuario.username },
      jwtSecret,
      {
        jwtExpiresIn: jwtExpiresIn,
      }
    );

    res.status(200).json({ token }); // Devolver el token al cliente
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesion." });
  }
};
module.exports = {
  iniciarsesion,
};
