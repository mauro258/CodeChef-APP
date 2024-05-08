import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const login = localStorage.getItem("login") === "true";
  return login ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
