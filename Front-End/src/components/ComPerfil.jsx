import React, { useState, useEffect } from "react";
import { getUserById } from "../services/authServices";
import { jwtDecode } from "jwt-js-decode";

const ComPerfil = () => {
  const [usuario, setUsuario] = useState("");

  const tokenEnciptado = sessionStorage.getItem("token");
  const token = jwtDecode(tokenEnciptado);
  const usuarioId = token.payload.id;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuarioTraido = await getUserById(usuarioId);

        setUsuario(usuarioTraido);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    if (usuarioId) {
      fetchUsuarios();
    }
  }, [usuarioId]);

  if (!usuario) {
    return <p>Cargando información del perfil...</p>;
  }
  return (
    <div className="contenedorPerfil">
      <h1>Mi Perfil</h1>
      <div className="contenedorFotoPerfil">
        <h3>Foto de perfil</h3>
        <div className="fotoPerfil">
          <img src="" alt="Foto de perfil" className="imagen" />
        </div>
        <input type="file" name="fotoPerfil" id="fotoPerfil" />
      </div>
      <div className="contenedorInfo">
        {usuario ? (
          <div>
            <h1>Informacion del Perfil</h1>
            <h3>Nombre</h3>
            <p>{usuario.nombre_usuario}</p>
            <h3>Apellido</h3>
            <p>{usuario.apellido}</p>
            <h3>Correo</h3>
            <p>{usuario.correo}</p>
            <h3>contraseña</h3>
            <p>{usuario.contrasena}</p>
          </div>
        ) : (
          <p>No se encontró el usuario.</p>
        )}
      </div>
    </div>
  );
};

export default ComPerfil;
