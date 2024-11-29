const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config");
const { Usuarios } = require("../models");

const get_all_usuarios = async (req, res) => {
  try {
    const usuario = await Usuarios.findAll();
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error); // Imprimir error para depuración
    res.status(500).json({ error: "Error al obtener los usuarios." });
  }
};

const registroUsers = async (req, res) => {
  const {
    nombre_usuario,
    apellido,
    correo,
    contrasena,
    fecha_registro,
    rol_id,
    especialidad_id,
  } = req.body;

  try {
    // Verificar si el correo ya existe
    const correoExistente = await Usuarios.findOne({ where: { correo } });
    if (correoExistente) {
      return res
        .status(401)
        .json({ message: "El correo ya está registrado en el sistema." });
    }

    // Encriptar la contraseña
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

    // Crear el usuario
    const usuario = await Usuarios.create({
      nombre_usuario,
      apellido,
      correo,
      contrasena: contrasenaEncriptada,
      fecha_registro,
      rol_id,
      especialidad_id,
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error de servidor. Verifíquelo." });
  }
};

const iniciarsesion = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Buscar el usuario por su correo
    const usuario = await Usuarios.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const esContrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );

    if (!esContrasenaValida) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, rol:usuario.rol_id },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      }
    );

    res.status(200).json({ token }); // Devolver el token al cliente
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión." });
  }
};

module.exports = {
  iniciarsesion,
  registroUsers,
  get_all_usuarios,
};
