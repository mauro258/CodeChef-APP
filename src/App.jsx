import { Inicio } from "./pages/Inicio";
import Login from "./pages/Login";
import { Recetas } from "./pages/Recetas";
import { Error404 } from "./pages/Error404";
import { Navbar } from "./navigation/Navbar";
import { SingleReceta } from "./pages/SingleReceta";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Categorias } from "./pages/Categorias";
import { UserProvider } from "./context/UserContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Inicio />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/categorias",
          element: <Categorias />,
        },
        {
          path: "/recetas",
          element: <Recetas />,
        },
        {
          path: "/receta/:id",
          element: <SingleReceta />,
        },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
  ]);

  return (
    <div>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
