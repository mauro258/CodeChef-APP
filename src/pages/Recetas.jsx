import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Error404 } from "./Error404";
import Swal from "sweetalert2";

export const Recetas = () => {
  const navigate = useNavigate();
  const [recetas, setRecetas] = useState([]);
  const [inputsearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const [isAgregandoReceta, setIsAgregandoReceta] = useState(false);

  const [newReceta, setNewReceta] = useState({
    categoria: {
      id: 1,
    },
    title: "",
    descripcion: "",
    ingredientes: "",
    imgUrl: "",
    vidUrl: "",
  });

  const getRecetas = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:8080/recetas");

      setRecetas(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error en getRecetas", error.message);
    }
  };

  const clean = useCallback(() => {
    getRecetas();
    setInputSearch("");
    navigate("");
  }, [navigate]);

  useEffect(() => {
    const title = searchParams.get("title") || "";
    if (title === "") {
      return clean();
    }
    setInputSearch(title);
  }, [searchParams]);

  useEffect(() => {
    getRecetas();
  }, []);

  const search = (e) => {
    setIsLoading(true);
    setInputSearch(e.target.value.toLowerCase());

    const filteredRecetas = recetas.filter((receta) =>
      receta.title.toLowerCase().includes(inputsearch)
    );
    if (e.target.value === "") {
      clean();
    } else {
      setRecetas(filteredRecetas);
      navigate("?title=" + e.target.value);
    }
    setIsLoading(false);
  };

  const asignarCampos = (e) => {
    setNewReceta({ ...newReceta, [e.target.name]: e.target.value });
  };

  const handleCategoriaChange = (e) => {
    const selectedCategoryId = parseInt(e.target.value);
    setNewReceta((prevReceta) => ({
      ...prevReceta,
      categoria: { id: selectedCategoryId },
    }));
  };

  const ejecutarFormulario = (e) => {
    e.preventDefault();
    guardarFormulario();
    setIsAgregandoReceta(false);
    getRecetas();
  };

  const guardarFormulario = async () => {
    try {
      const data = await axios.post("http://localhost:8080/recetas", newReceta);
      Swal.fire({
        icon: "success",
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
      getRecetas();
    } catch (error) {
      if (!error.response.data) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          timer: 2000,
          showConfirmButton: false,
        });
        getRecetas();
      }
      console.log("Error en guardarFormulario", error.message);
    }
  };

  return (
    <div className="container   ">
      <div>
        <button
          className="btn btn-warning text-left mt-2"
          onClick={() => setIsAgregandoReceta(true)}
        >
          Agregar Receta
        </button>
      </div>
      {isAgregandoReceta ? (
        <div className="container mt-5">
          <form onSubmit={ejecutarFormulario}>
            <div className="mt-3">
              <label className="form-label">Nombres</label>
              <input
                type="text"
                name="title"
                className="form-control"
                onChange={(e) => asignarCampos(e)}
                required
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Descripcion</label>
              <input
                type="text"
                name="descripcion"
                className="form-control"
                onChange={(e) => asignarCampos(e)}
                required
              />
            </div>

            <div className="mt-3">
              <label className="form-label">Preparacion</label>
              <input
                type="text"
                name="ingredientes"
                className="form-control"
                onChange={(e) => asignarCampos(e)}
                required
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Url imagen</label>
              <input
                type="text"
                name="imgUrl"
                className="form-control"
                onChange={(e) => asignarCampos(e)}
                required
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Url video</label>
              <input
                type="text"
                name="vidUrl"
                className="form-control"
                onChange={(e) => asignarCampos(e)}
                required
              />
            </div>
            <div className="mt-2">
              <label className="form-label">Categoria</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleCategoriaChange}
                required
              >
                <option value="" disabled>
                  Seleccione una categoria
                </option>
                <option value="1">Platos principales</option>
                <option value="2">Entradas y aperitivos</option>
                <option value="3">Guarniciones</option>
                <option value="4">Panaderia y reposteria</option>
                <option value="5">Bebidas</option>
                <option value="6">Desayunos</option>
                <option value="7">Recetas saludables</option>
              </select>
            </div>

            <div className="">
              <button
                className="btn btn-success m-3 form-control"
                type="submit"
              >
                Guardar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setIsAgregandoReceta(false)}
              >
                Atrás
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <section className="col-xxl-8 form-group mx-auto">
            <h1 className="text-center text-success mt-3 mb-3">Recetas</h1>
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              value={inputsearch}
              onChange={(e) => search(e)}
            />
          </section>

          {isLoading ? (
            <div className="mt-4 d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {recetas ? (
                recetas.map((receta) => (
                  <div key={receta.id} className="col">
                    <div className="card h-100  bg-dark mt-5">
                      <NavLink to={"/receta/" + receta.id}>
                        <img
                          src={receta.imgUrl}
                          className="card-img-top"
                          alt=""
                        />
                        <div className="card-body bg-dark">
                          <h5 className="card-title text-light mt-3">
                            {receta.title}
                          </h5>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-white mt-5">
                  <p>404</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
