import React from "react";
import { useNavigate } from "react-router-dom";

export const Error404 = () => {
  const navigation = useNavigate();

  const goBack = () => {
    navigation(-1);
  };

  return (
    <div className="mt-5 text-white text-center">
      <h1 className="text-danger">Error 404</h1>
      <p>
      <strong>No se encontro la receta que esta buscando, falta programarla</strong>
      </p>
      
      <button className="btn btn-danger" onClick={() => goBack()}>
        Atrás
      </button>
    </div>
  );
};
