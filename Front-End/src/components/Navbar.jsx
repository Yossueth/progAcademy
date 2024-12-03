import "../css/Navbar.css";
import React, { useContext } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import AcademyContext from "./Context/AcademyContext";

const Navbar = ({ userRole }) => {
  const allowedRoles = [2];

  // const { first, token } = useContext(AcademyContext);

  return (
    <div className="navbar">
      <div className="logo">
        <h2>ProgrAcademy</h2>
      </div>
      <div className="search">
        <input
          id="buscador"
          // onChange={Filtro}
          type="text"
          placeholder="Buscar..."
        />
      </div>
      <div className="nav">
        <div className="dropdown">
          <a
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FaUser size={24} />
            <span className="caret"></span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer">
                Perfil
              </a>
            </li>
            <li>
              {allowedRoles.includes(userRole) && (
                <a
                  href="/agregarCursos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cursos
                </a>
              )}
            </li>
            <li role="separator" className="divider"></li>
            <li className="cerrarSesion">
              <p>Cerrar sesión</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
