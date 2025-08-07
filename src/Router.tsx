import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Member from "./pages/Member";
import MemberBadges from "./pages/sub-pages/MemberBadges";
import MemberConnects from "./pages/sub-pages/MemberConnects";
import MemberReviews from "./pages/sub-pages/MemberReviews";

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
        path: "members/:id",
        element: <Member />,
        children: [
          {
            path: "badges",
            element: <MemberBadges />,
          },
          {
            path: "connects",
            element: <MemberConnects />,
          },
          {
            path: "reviews",
            element: <MemberReviews />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
