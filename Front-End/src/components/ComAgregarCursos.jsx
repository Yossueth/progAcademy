import React, { useState, useEffect, useContext } from "react";
import "../css/cursos.css";
import cargarArchivos from "../../firebase/Firebase";
import { postCursos, getCursos, deleteCursos } from "../services/cursos";
import { getCategorias } from "../services/categoriasServices";
import Swal from "sweetalert2";
// import AcademyContext from "./Context/AcademyContext";
import { jwtDecode } from "jwt-js-decode";

const ComAgregarCursos = () => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cursos, setCursos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [precio, setPrecio] = useState("");

  //  const { token } = useContext(AcademyContext);
  //  console.log(token);

  const tokenEnciptado = sessionStorage.getItem("token");
  const token = jwtDecode(tokenEnciptado);

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

  const cargarArchivosFirebase = async (data) => {
    const obtenerArchivo = data;
    if (obtenerArchivo) {
      const urlArchivo = await cargarArchivos(obtenerArchivo);
      return urlArchivo;
    }
  };

  const fetchCursos = async () => {
    try {
      const data = await getCursos();
      setCursos(data);
    } catch (error) {
      console.error("Error al cargar los cursos:", error);
    }
  };

  const fetchCate = async () => {
    try {
      const data = await getCategorias();
      setCategoria(data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
    fetchCate();
  }, []);

  const eliminarCursos = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro que quieres eliminar este curso?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
    });

    if (result.isConfirmed) {
      try {
        await deleteCursos(id);
        await Swal.fire({
          title: "¡Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "success",
        });
        fetchCursos();
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

  const cargarCurso = async (e) => {
    e.preventDefault();
    console.log("Categoria", categoriaSeleccionada);
    try {
      const imgFile = await cargarArchivosFirebase(file);
      if (imgFile) {
        const newCurso = {
          archivo: imgFile,
          nombre_curso: nombre,
          descripcion,
          precio,
          categoria_id: categoriaSeleccionada,
          usuario_id: token.payload.id,
        };
        await postCursos(newCurso);
        cerrarModal();
      }
    } catch (error) {
      console.error("Error al guardar el curso:", error);
    }
  };

  return (
    <div>
      <div className="gestionCursos">
        <h1>Gestión de cursos</h1>
        <button className="btnAgregar" onClick={abrirModal}>
          Agregar cursos
        </button>
      </div>
      <div className="containerCard">
        {cursos.map((curso) => (
          <div className="card" key={curso.id}>
            {/* <video controls width="100%">
                <source src={curso.archivo} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
            <img
              className="imagenPrueba"
              src={curso.archivo}
              alt={curso.nombre}
            />
            <div className="textoCarta">
              <h3 className="tituloCartas">{curso.nombre_curso}</h3>
              <p className="descripcion">{curso.descripcion}</p>
              <p className="precio">${curso.precio}</p>
            </div>
            <div className="botones">
              <button id="margenes" onClick={() => eliminarCursos(curso.id)}>
                Eliminar
              </button>
              <button>Editar</button>
            </div>
          </div>
        ))}
      </div>
      {/*-------------modal-------------- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Curso</h2>
            <form>
              <label>
                Nombre del curso:
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Escribe el nombre del curso"
                />
              </label>
              <br />
              <label>
                Archivo del curso:
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
              <br />
              <label>
                Descripción:
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Escribe la descripción del curso"
                ></textarea>
              </label>
              <br />
              <label>
                Precio del curso:
                <input
                  type="text"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Escribe el precio del curso"
                />
              </label>
              <br />
              <label>
                Categoría del curso:
                <select
                  id="inputSelect"
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                  <option value="">Seleccione la categoría</option>
                  {categoria.map((cate) => (
                    <option key={cate.id} value={cate.id}>
                      {cate.nombre_categoria}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <button
                type="button"
                className="btnGuardar"
                onClick={cargarCurso}
              >
                Guardar
              </button>
              <button type="button" className="btnCerrar" onClick={cerrarModal}>
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComAgregarCursos;
