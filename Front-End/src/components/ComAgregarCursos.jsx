import "../css/cursos.css";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-js-decode";
import React, { useState, useEffect } from "react";
import cargarArchivos from "../../firebase/Firebase";
import { getCategorias } from "../services/categoriasServices";
import {
  postCursos,
  getCursos,
  deleteCursos,
  putCursos,
} from "../services/cursos";

// import AcademyContext from "./Context/AcademyContext";

const ComAgregarCursos = () => {
  const [file, setFile] = useState(null);
  const [precio, setPrecio] = useState("");
  const [nombre, setNombre] = useState("");
  const [cursos, setCursos] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [miniatura, setMiniatura] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [cursoActual, setCursoActual] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  //token
  const tokenEnciptado = sessionStorage.getItem("token");
  const token = jwtDecode(tokenEnciptado);
  //abrir modal
  const abrirModal = (curso = null) => {
    setCursoActual(curso);
    setNombre(curso?.nombre_curso || "");
    setDescripcion(curso?.descripcion || "");
    setPrecio(curso?.precio || "");
    setCategoriaSeleccionada(curso?.categoria_id || "");
    setFile(null);
    setModalOpen(true);
  };
  //cerrar modal
  const cerrarModal = () => {
    setModalOpen(false);
    setCursoActual(null);
  };
  //trae los archivos del firebese
  const cargarArchivosFirebase = async (data) => {
    const obtenerArchivo = data;
    if (obtenerArchivo) {
      const urlArchivo = await cargarArchivos(obtenerArchivo);
      return urlArchivo;
    }
  };
  //get de usuarios
  const fetchCursos = async () => {
    try {
      const data = await getCursos();
      setCursos(data);
    } catch (error) {
      console.error("Error al cargar los cursos:", error);
    }
  };
  //get categorias
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
  //funcion para eliminaar cursos
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
        fetchCursos(); //para recargar la lista
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
  //funcion para  agregar los cursos
  const cargarCurso = async (e) => {
    e.preventDefault();
    try {
      const urlMiniatura = await cargarArchivosFirebase(miniatura);
      const urlArchivo = await cargarArchivosFirebase(file);
      if (urlMiniatura && urlArchivo) {
        const newCurso = {
          archivo: urlArchivo,
          nombre_curso: nombre,
          miniatura: urlMiniatura,
          descripcion,
          precio,
          categoria_id: categoriaSeleccionada,
          usuario_id: token.payload.id,
        };
        await postCursos(newCurso);
        cerrarModal(); // para cerrar modal
        fetchCursos(); //para recargar la lista
      }
    } catch (error) {
      console.error("Error al guardar el curso:", error);
    }
  };
  //funcion para editar cursos
  const editarCursoHandler = async () => {
    try {
      const urlMiniatura = await cargarArchivosFirebase(miniatura);
      const imgFile = await cargarArchivosFirebase(file);
      if (urlMiniatura && imgFile) {
        const updatedCurso = {
          archivo: imgFile,
          nombre_curso: nombre,
          miniatura: urlMiniatura,
          descripcion,
          precio,
          categoria_id: categoriaSeleccionada,
        };
        await putCursos(updatedCurso, cursoActual.id);
        cerrarModal();
        fetchCursos();
      }
    } catch (error) {
      console.error("Error al editar el curso:", error);
    }
  };

  return (
    <div>
      <div className="gestionCursos">
        <h1>Gestión de cursos</h1>
        <button className="btnAgregar" onClick={() => abrirModal()}>
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
              src={curso.miniatura}
              alt={curso.nombre}
            />
            <div className="textoCarta">
              <h3 className="tituloCartas">{curso.nombre_curso}</h3>
              <p className="descripcion">{curso.descripcion}</p>
              <p className="precio">${curso.precio}</p>
            </div>
            <hr />
            <div className="botones">
              <button
                className="btnEliminarCurso"
                onClick={() => eliminarCursos(curso.id)}
              >
                Eliminar
              </button>
              <button
                className="btnActualizarCurso"
                onClick={() => abrirModal(curso)}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{cursoActual ? "Editar Curso" : "Agregar Curso"}</h2>
            <form className="formModal">
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
                miniatura del curso:
                <input
                  type="file"
                  onChange={(e) => {
                    setMiniatura(e.target.files[0]);
                  }}
                />
              </label>
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
                  value={categoriaSeleccionada}
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
              <div className="botonesModal">
                <button
                  type="button"
                  className="btnGuardar"
                  onClick={cursoActual ? editarCursoHandler : cargarCurso}
                >
                  {cursoActual ? "Actualizar" : "Guardar"}
                </button>
                <button
                  type="button"
                  className="btnCerrar"
                  onClick={cerrarModal}
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComAgregarCursos;
