import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const Navbar = () => {
  const { isLogin, setIsLogin } = useUser();
  const navigate = useNavigate();
  const salir = () => {
    setIsLogin(false);
    navigate("/login");
    localStorage.setItem("login", false);
  };

  return (
    <div>
      {/* navbar */}
      <div className="col-xxl-12">
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark fixed-top py-3">
          <div className="container-fluid">
            <NavLink to={"/"} className="navbar-brand text-success">
              CodeChef
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {isLogin ? (
              <div>
                <div className="collapse navbar-collapse" id="navmenu">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink to={"/"} className="nav-link">
                        Inicio
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to={"/recetas"} className="nav-link">
                        Recetas
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" onClick={() => salir()}>
                        Salir
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <div className="collapse navbar-collapse" id="navmenu">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink to={"/"} className="nav-link">
                        Inicio
                      </NavLink>
                    </li>
                    {/* <li className="nav-item">
                  <a href="#categories" className="nav-link">
                    Categorías
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#contact" className="nav-link">
                    Contáctenos
                  </a>
                </li> */}
                    <li className="nav-item">
                      <NavLink to={"/login"} className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      {/* end navbar */}
      <Outlet />
    </div>
  );
};
