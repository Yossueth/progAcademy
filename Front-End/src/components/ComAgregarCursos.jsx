import React, { useState, useEffect } from "react";
import "../css/cursos.css";
import cargarArchivos from "../../firebase/Firebase";
import {
  postCursos,
  getCursos,
  deleteCursos,
  putCursos,
} from "../services/cursos";
import { getCategorias } from "../services/categoriasServices";
import Swal from "sweetalert2";
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
  const [cursoActual, setCursoActual] = useState(null);

  const tokenEnciptado = sessionStorage.getItem("token");
  const token = jwtDecode(tokenEnciptado);

  const abrirModal = (curso = null) => {
    setCursoActual(curso);
    setNombre(curso?.nombre_curso || "");
    setDescripcion(curso?.descripcion || "");
    setPrecio(curso?.precio || "");
    setCategoriaSeleccionada(curso?.categoria_id || "");
    setFile(null);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setCursoActual(null);
  };

  const cargarArchivosFirebase = async (data) => {
    if (data) {
      const urlArchivo = await cargarArchivos(data);
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
        fetchCursos();
      }
    } catch (error) {
      console.error("Error al guardar el curso:", error);
    }
  };

  const editarCursoHandler = async () => {
    try {
      const imgFile = file
        ? await cargarArchivosFirebase(file)
        : cursoActual.archivo;
      const updatedCurso = {
        archivo: imgFile,
        nombre_curso: nombre,
        descripcion,
        precio,
        categoria_id: categoriaSeleccionada,
      };
      await putCursos(updatedCurso, cursoActual.id); 
      cerrarModal();
      fetchCursos();
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{cursoActual ? "Editar Curso" : "Agregar Curso"}</h2>
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
              <button
                type="button"
                className="btnGuardar"
                onClick={cursoActual ? editarCursoHandler : cargarCurso}
              >
                {cursoActual ? "Actualizar" : "Guardar"}
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
