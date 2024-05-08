// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useState } from "react";

const Login = () => {

  const [userInfo, setUserInfo] = useState({
    email: "",
    passw: "",
  });

  const navigate = useNavigate();

  const { setIsLogin } = useUser();

  const userLogin = (e) => {
    e.preventDefault();
    if (userInfo.email === "1@1" && userInfo.passw === "1234") {
      alert("Bienvenido Caballer@");
      setIsLogin(true);
      localStorage.setItem("login", true);
      navigate("/");
      return;
    }
    alert("Email o contraseña invalidos");
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <div className="d-flex justify-content-center">
        <div className="col-8">
          <form onSubmit={userLogin}>
            {/* Capturar correo */}
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                className="form-control"
                type="email"
                name="email"
                autoFocus
                required
                // onChange={(e) => setEmail(e.target.value)}
                // onChange={(e) =>
                //   setUserInfo({ ...userInfo, email: e.target.value })
                // }

                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* Capturar contraseña */}
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                className="form-control"
                type="password"
                name="passw"
                required
                // onChange={(e) => setPassw(e.target.value)}
                // onChange={(e) =>
                //   setUserInfo({ ...userInfo, passw: e.target.value })       }

                onChange={(e) => handleChange(e)}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
