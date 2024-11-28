import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, postUsersRegister } from "../services/authServices";

const FormRegistro = () => {
  const [nombre_usuario, setNombre_usuario] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obtener lista de usuarios del backend
      const userList = await getUsers();

      // Verificar si el correo ya está registrado
      const existingUser = userList.find((user) => user.correo === correo);
      if (existingUser) {
        Swal.fire({
          icon: "error",
          title: "Correo ya registrado",
          text: "Un usuario con esa dirección de correo electrónico ya está registrado.",
        });
        return;
      }

      const newUser = {
        nombre_usuario: nombre_usuario,
        apellido: apellido,
        correo: correo,
        contrasena: password,
        rol_id: 1,
        especialidad_id: null
      };


      await postUsersRegister(newUser);
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Error durante el registro:", error);
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: "Ocurrió un error al intentar registrarte. Por favor, inténtalo más tarde.",
      });
    }
  };

  return (
    <div>
      <section className="sectionRegistro">
        <h2>Registro</h2>
        <form id="formRegistro" onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            value={nombre_usuario}
            onChange={(e) => setNombre_usuario(e.target.value)}
            required
          />
          <label>Apellido</label>
          <input
            type="text"
            placeholder="Ingrese su apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Ingrese su email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="submit" value="Registro" />
          <p>
            Ya tienes una cuenta? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default FormRegistro;
