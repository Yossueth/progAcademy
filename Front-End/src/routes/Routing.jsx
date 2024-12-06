import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AgregarCursos from "../pages/AgregarCursos";
import Administracion from "../pages/administracion";
import Solicitudes from "../components/Solicitudes";

const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/agregarCursos" element={<AgregarCursos />} />
          <Route path="/administracion" element={<Administracion />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
          <Route />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
