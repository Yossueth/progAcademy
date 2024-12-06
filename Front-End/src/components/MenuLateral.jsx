import React from "react";
import "../css/MenuLateral.css";
import { Link } from "react-router-dom";

const MenuLateral = ({setRolElegido}) => {
  const manejarClick = (rol) => {
    setRolElegido(rol);
  };
  return (
    <div className="vertical-menu">
      <div className="filtracion">
        <h2 className="filtrarTabla">Menú</h2>
        <button onClick={() => {manejarClick(null)}} className="menu-item">Mostrar todos</button>
        <button onClick={() => {manejarClick(1)}} className="menu-item">Estudiantes</button>
        <button onClick={() => {manejarClick(2)}} className="menu-item">Profesores</button>
        <button onClick={() => {manejarClick(3)}} className="menu-item">Admins</button>
      </div>
      <Link className="menu-item" to="/solicitudes">Solicitides</Link>
      <button className="menu-item">Cerrar sesion</button>
    </div>
  );
};

export default MenuLateral;
