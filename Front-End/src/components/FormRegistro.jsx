import { useState } from "react";

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
    navigate("/");
  };

  return <div></div>;
};

export default FormRegistro;
