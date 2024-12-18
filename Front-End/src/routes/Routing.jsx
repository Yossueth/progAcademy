import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AgregarCursos from "../pages/AgregarCursos";
import Administracion from "../pages/administracion";
import Perfil from "../pages/perfil";
import RutaPrivada from "./RutaPrivada";

const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/agregarCursos" element={<RutaPrivada><AgregarCursos /></RutaPrivada>} />
          <Route path="/administracion" element={<RutaPrivada> <Administracion /></RutaPrivada>} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
