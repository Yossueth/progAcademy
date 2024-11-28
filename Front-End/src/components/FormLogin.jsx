import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postUsersLogin } from "../services/LoginServices";
import { getUsers } from "../services/authServices";

const FormLogin = () => {
  const [correo, setCorreo] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postUsersLogin(correo, password);
       Swal.fire({
        icon: "success",
        title: "Login exitoso",
        text: "El inicio de sesión fue exitoso!",
      });
      navigate('/home')
      return;
    }catch{
      Swal.fire({
        icon: "error",
        title: "Login error",
        text: "El inicio de sesión falló!",
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
            placeholder="ingrese su email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="ingrese su password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input type="submit" value={"Iniciar sesion"} />
          <p>
            Aun no tienes una cuenta? <Link to="/">Registro</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default FormLogin;
