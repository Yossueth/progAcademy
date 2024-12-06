import React, { useEffect, useState, useCallback } from "react";
import { getUsers, patchUsers } from "../services/authServices";
import "../css/Admin.css";
import Swal from "sweetalert2";
import MenuLateral from "./MenuLateral";

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [rolElegido, setRolElegido] = useState(null);

  const traerUsuarios = useCallback(() => {
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

  useEffect(()=>{
    traerUsuarios()
  }, [traerUsuarios])

  const editRol = async (id, newRolId, nombre_usuario) => {
    try {
      const result = await Swal.fire({
        title: `¿Seguro que quieres actualizar el rol de ${nombre_usuario}?`,
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar!",
      });

      if (result.isConfirmed) {
        await patchUsers(newRolId, id);
        traerUsuarios();
        Swal.fire({
          title: "¡Actualizado!",
          text: `El rol de ${nombre_usuario} ha sido actualizado.`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
    }
  };

  const filtroUsuarios = rolElegido === null
  ? usuarios 
  : usuarios.filter( (usuarios) => usuarios.rol_id === rolElegido);  

  return (
    <div className="tabla-container">
      <h1>Lista de Usuarios</h1>
      <div className="tabla-scroll">
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
            {filtroUsuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre_usuario}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.correo}</td>
                <td>
                  <select
                    id="inputSelectAdmin"
                    defaultValue={usuario.rol_id}
                    onChange={(e) =>
                      editRol(
                        usuario.id,
                        parseInt(e.target.value),
                        usuario.nombre_usuario
                      )
                    }
                  >
                    <option value={1}>Estudiante</option>
                    <option value={2}>Profesor</option>
                    <option value={3}>Administrador</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MenuLateral setRolElegido={setRolElegido}/>
    </div>
  );
};

export default Admin;
