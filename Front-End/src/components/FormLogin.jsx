import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { postUsersLogin } from "../services/LoginServices";
import "../css/login.css";
import { jwtDecode } from "jwt-js-decode";
import AcademyContext from "./Context/AcademyContext";

const FormLogin = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AcademyContext)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encrypted_token_JSON = await postUsersLogin(correo, password);
      console.log("Respuesta del servidor:", encrypted_token_JSON);
      sessionStorage.setItem("token", encrypted_token_JSON.token);
      
      Swal.fire({
        icon: "success",
        title: "Login exitoso",
        text: `Bienvenido`,
      });
      const tokenEnciptado = sessionStorage.getItem("token");
      const token = jwtDecode(tokenEnciptado);
      
      if (token.payload.rol === 1) {
        login(token.payload.rol)
        navigate("/home");
      }
      if (token.payload.rol === 2) {
        login(token.payload.rol)
        navigate("/agregarCursos");
      }
      if (token.payload.rol === 3 || token.payload.rol === 4) {
        login(token.payload.rol)
        navigate("/administracion");
      }
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
