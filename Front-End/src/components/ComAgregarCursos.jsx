import React, { useState, useEffect } from "react";
import "../css/cursos.css";
import cargarArchivos from "../../Firebase";
import { postCursos, getCursos } from "../services/cursos";
import { getCategorias } from "../services/categoriasServices";

const ComAgregarCursos = () => {
  const [nombre, setNombre] = useState("");
  const [archivo, setArchivo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cursos, setCursos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

  const cargarArchivosFirebase = async (e) => {
    const obtenerArchivo = e.target.files[0];
    if (obtenerArchivo) {
      const urlArchivo = await cargarArchivos(obtenerArchivo);
      setArchivo(urlArchivo);
    }
  };

  const cargarCurso = async (e) => {
    e.preventDefault();
    const newCurso = { nombre, archivo, categoria, descripcion };
    try {
      await postCursos(newCurso);
      cerrarModal();
      // Opcional: recargar la lista de cursos
    } catch (error) {
      console.error("Error al guardar el curso:", error);
    }
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await getCursos();
        setCursos(data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };
    fetchCursos();

    const fetchCate = async () => {
      try {
        const data = await getCategorias();
        setCategoria(data);
      } catch (error) {
        console.error("Error al cargar los categorias:", error);
      }
    };
    fetchCate();
  }, []);

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
            <figure>
              <img src={curso.archivo} alt={curso.nombre} />
            </figure>
            <div className="texto">
              <h3>{curso.nombre}</h3>
              <p>{curso.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Curso</h2>
            <form onSubmit={cargarCurso}>
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
                <input type="file" onChange={cargarArchivosFirebase} />
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
                Categoría del curso:
                <select
                  id="inputSelect"
                  onChange={(e) => setCategoria(e.target.value)}
                  value={categoria}
                >
                  <option>Seleccionela categoria</option>
                  {/* {categoria.map((cate) => {
                    <option key={cate.id}>{cate.Nombre_Categoria}</option>
                  })} */}
                </select>
              </label>
              <br />
              <button type="submit" className="btnGuardar">
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
