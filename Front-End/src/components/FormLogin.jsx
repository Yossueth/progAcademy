import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postUsersLogin } from "../services/LoginServices";
import "../css/login.css";

const FormLogin = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encrypted_token_JSON = await postUsersLogin(correo, password); // Obtengo el token encriptado del servidor
      const encrypted_token = encrypted_token_JSON.token;

      sessionStorage.setItem("token", encrypted_token); // Guardo el token encriptado

      Swal.fire({
        icon: "success",
        title: "Login exitoso",
        text: `Bienvenido`,
      });

      navigate("/home");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: "Correo o contraseña incorrectos.",
      });
    }
  };

  return (
    <div>
      <section className="sectionLogin">
        <h2>Login</h2>
        <form id="formLogin" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Ingrese su email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value={"Iniciar sesión"} />
          <p>
            ¿Aún no tienes una cuenta? <Link to="/">Regístrate</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default FormLogin;
