import React, { useState } from "react";
import "../css/cursos.css";

const ComAgregarCursos = () => {
  const [nombre, setNombre] = useState("");
  const [archivo, setArchivo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

  return (
    <div>
      <div className="gestionCursos">
        <h1>Gestión de cursos</h1>
        <button className="btnAgregar" onClick={abrirModal}>
          Agregar cursos
        </button>
      </div>
      <div className="containerCard">
        <div className="card">
          <figure>
            <p>Imagen</p>
          </figure>
          <div className="texto">
            <h3>Jordan 1 White</h3>
            <h4>$500</h4>
          </div>
        </div>
      </div>
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
                  value={archivo}
                  onChange={(e) => setArchivo(e.target.value)}
                />
              </label>
              <label>
                Descripción:
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Escribe la descripción del curso"
                ></textarea>
              </label>
              <br />
              <br />
              <label>
                Cartegoria del curso:
                <select
                  id="inputSelect"
                  onChange={(e) => setCategoria(e.target.value)}
                  value={categoria}
                >
                  <option>categoria</option>
                  <option>html</option>
                  <option>phyton</option>
                  <option>react</option>
                  <option>javaScript</option>
                  <option>node.js</option>
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
