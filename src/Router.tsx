import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PopupDiscordLogin from "./pages/popups/PopupDiscordLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "popup/login/discord",
        element: <PopupDiscordLogin />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
