import { useState } from "react";
import Registro from "../pages/Registro";

const FormRegistro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userList = usuarios; //aqui haria el get

    const userRegister = userList.find((user) => user.email === email);

    if (userRegister) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Un usuario con esa dirección de correo electrónico ya está registrado 😭!",
      });
      return;
    }

    const objectUsers = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
    };

    await post(objectUsers); // aqui de haria el post
    Swal.fire("Registro exitoso!");
    navigate("/login");
  };

  return (
    <div>
      <section className="sectionRegistro">
        <h2>Registro</h2>
        <form id="formRegistro">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input type="submit" value={"Registro"} />
          <p>
            Ya tienes una cuenta? <Link to="/login"></Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default FormRegistro;
