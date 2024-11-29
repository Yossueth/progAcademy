const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Obtener el token del header

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret); // Verificar el token con la clave secreta
    req.usuario = decoded; // Guardar la información del usuario decodificado en la request
    if (verificarAdmin(req)) {
      next();
    } else {
      return res
        .status(401)
        .json({ error: "Acceso denegado. Usuario no admitido." });
    }
  } catch (error) {
    res.status(401).json({ error: "Token inválido." });
  }
};

// Middleware para verificar el rol del usuario

const verificarAdmin = (req) => {
  if (req.usuario && req.usuario.rol === 3) {
    return true;
  } else {
    return false;
  }
};

module.exports = { verificarToken, verificarAdmin }; // Exportamos ambos middlewares
