import React, { useEffect, useState, useCallback } from "react";
import { getUsers, patchUsers, deleteUsers } from "../services/authServices";
import "../css/Admin.css";
import Swal from "sweetalert2";
import MenuLateral from "./MenuLateral";
import { jwtDecode } from "jwt-js-decode";

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [rolElegido, setRolElegido] = useState(null);

  const tokenEnciptado = sessionStorage.getItem("token");
  let rolPermitido;

  if (tokenEnciptado) {
    try {
      const token = jwtDecode(tokenEnciptado);
      rolPermitido = token?.payload?.rol;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      rolPermitido = null;
    }
  }

  const allowedRoles = [4];

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

  useEffect(() => {
    traerUsuarios();
  }, [traerUsuarios]);

  const eliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro que quieres eliminar este usuario?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
    });

    if (result.isConfirmed) {
      try {
        await deleteUsers(id);
        await Swal.fire({
          title: "¡Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "success",
        });
        traerUsuarios();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un problema al eliminar el producto.",
          icon: "error",
        });
      }
    }
  };

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

  const filtroUsuarios =
    rolElegido === null
      ? usuarios
      : usuarios.filter((usuarios) => usuarios.rol_id === rolElegido);

  return (
    <div>
      <div className="tabla-container">
        <h1 className="textoListaUsuarios">Lista de Usuarios</h1>
        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th className="tituloTabla">Nombre</th>
                <th className="tituloTabla">Apellido</th>
                <th className="tituloTabla">Email</th>
                <th className="tituloTabla">Rol</th>
                <th className="tituloTabla">Eliminar</th>
              </tr>
            </thead>
            <tbody className="color-table">
              {filtroUsuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre_usuario}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.correo}</td>
                  <td className="tablaRol">
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
                      {allowedRoles.includes(rolPermitido) && (
                        <>
                          <option value={3}>Administrador</option>
                          <option value={4}>SuperAdmin</option>
                        </>
                      )}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btnEliminar"
                      onClick={() => eliminar(usuario.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MenuLateral setRolElegido={setRolElegido} />
    </div>
  );
};

export default Admin;
