import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import Home from "../pages/Home";

const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
