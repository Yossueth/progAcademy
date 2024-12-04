import React, { useEffect, useState } from "react";
import { getUsers } from "../services/authServices";
import "../css/Admin.css";

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const listaUsuarios = await getUsers();
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.email}>
              <td>{usuario.nombre_usuario}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.rol_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;