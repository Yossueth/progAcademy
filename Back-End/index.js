const express = require("express");
const { sequelize } = require("./models"); // Importa la conexión a la base de datos
const categorias_routes = require("./routes/categorias_routes"); // Importa las rutas de productos
const cursos_routes = require("./routes/cursos_routes");
const especialidad_routes = require("./routes/especialidad_routes");
const pagos_routes = require("./routes/pagos_routes");
const perfiles_routes = require("./routes/perfiles_routes");
const roles_routes = require("./routes/roles_routes");
const sesion_routes = require("./routes/sesion_routes");
const solicitudes_routes = require("./routes/solicitudes_routes");
const usuarios_routes = require("./routes/usuarios_routes");
const valoraciones_routes = require("./routes/valoraciones_routes");
const authRoutes = require("./Routes/authRoutes");

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Probar la conexion con la base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conexion a la base de datos exitosa."))
  .catch((error) =>
    console.error("No se pudo conectar a la base de datos:", error)
  );

app.use("/auth", authRoutes);

app.use("/categorias", categorias_routes);
app.use("/cursos", cursos_routes);
app.use("/especialidad", especialidad_routes);
app.use("/pagos", pagos_routes);
app.use("/perfiles", perfiles_routes);
app.use("/roles", roles_routes);
app.use("/sesion", sesion_routes);
app.use("/solicitudes", solicitudes_routes);
app.use("/usuarios", usuarios_routes);
app.use("/valoraciones", valoraciones_routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT} `);
});
