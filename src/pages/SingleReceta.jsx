import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const SingleReceta = () => {
  const [receta, setReceta] = useState({});
  const { id } = useParams();
  const navigation = useNavigate();
  const [actualizando, setActualizando] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [newReceta, setNewReceta] = useState({
    title: "",
    descripcion: "",
    ingredientes: "",
    imgUrl: "",
    vidUrl: "",
  });



  useEffect(() => {
    const searchReceta = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.get(`http://localhost:8080/recetas/${id}`);
        setReceta(data.data);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        console.log("Error en searchReceta", error.message);
      }
    };
    searchReceta();
  }, [id]);

  const actualizarReceta = async (recetaActual) => {
    try {
      setActualizando(true);
      setNewReceta(recetaActual);
    } catch (error) {
      console.log("Error en actualizarReceta", error.message);
    }
  };

  const guardarRecetaActualizada = async (newReceta) => {};

  const eliminarReceta = async (id) => {
    try {
      Swal.fire({
        title: "¿Estás seguro de eliminar esta receta? ",
        text: "¡Esta acción es irreversible!",
        icon: "warning",
        showCancelButton: true,

        confirmButtonText: "!Si,Eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsloading(true);
          const { data } = await axios.delete(
            `http://localhost:8080/recetas/${id}`
          );
          
          Swal.fire({
            icon: "success",
            text: data.message,
            timer: 2000,
            showConfirmButton: false,
          });
          setIsloading(false);
          navigation("/recetas")
          Swal.fire({
            text: data.message,
            icon: "success",
          });
        }
      });
    } catch (error) {
      setIsloading(false);
      console.log("Error en searchReceta", error.message);
    }
  };

  const goBack = () => {
    navigation(-1);
  };

  return (
    <div className="card mt-4 bg-dark">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <img src={receta.imgUrl} alt="" className="card-img-top" />
          </div>

          <div className="col-md-8">
            <div className="card-body ">
              <div className="card-title text-success text-center">
                <h1>{receta.title}</h1>
              </div>
              <p className="text-light">{receta.ingredientes}</p>
              <a
                href={receta.vidUrl}
                target="_blank"
                className="text-light m-2"
              >
                <i className="fa-brands fa-youtube me-2"></i>
                {receta.vidUrl}
              </a>
              <div className="d-flex justify-content-between">
                <div className="d-grid gap-2 d-md-block">
                  {/* <button
                    className="btn btn-success m-4"
                    type="button"
                    onClick={() => actualizarReceta(receta)}
                  >
                    Actualizar
                  </button> */}
                  <button
                    className="btn btn-danger m-4"
                    type="button"
                    onClick={() => eliminarReceta(receta.id)}
                  >
                    Eliminar
                  </button>
                </div>
                <button className="btn btn-danger" onClick={() => goBack()}>
                  Atrás
                </button>
              </div>
            </div>
          </div>

          {actualizando ? (
            <div className="container d-flex p-2 justify-content-center ">
              <form className="col-md-3 col-lg-8 ">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default">
                    Title
                  </span>
                  <input
                    type="text"
                    value={newReceta.title}
                    name="title"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) =>
                      setNewReceta({ ...newReceta, title: e.target.value })
                    }
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default">
                    Descripcion
                  </span>
                  <input
                    type="text"
                    value={newReceta.descripcion}
                    name="title"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default">
                    Modo de preparacion
                  </span>
                  <input
                    type="text"
                    value={newReceta.ingredientes}
                    name="title"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default">
                    Url de la imagen
                  </span>
                  <input
                    type="text"
                    value={newReceta.imgUrl}
                    name="title"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-default">
                    Url de el video
                  </span>
                  <input
                    type="text"
                    value={newReceta.vidUrl}
                    name="title"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-success m-2"
                    onClick={() => setReceta(actualizarReceta())}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => setActualizando(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <h1></h1>
          )}
        </div>
      )}
    </div>
  );
};
