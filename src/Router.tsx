import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Member from "./pages/Member";
import MemberBadges from "./pages/sub-pages/MemberBadges";
import MemberConnects from "./pages/sub-pages/MemberConnects";
import MemberReviews from "./pages/sub-pages/MemberReviews";
import Books from "./pages/Books";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import EmptyLayout from "./pages/EmptyLayout";

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
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "movies",
        element: <EmptyLayout />,
        children: [
          {
            path: "",
            element: <Movies />,
          },
          {
            path: ":id",
            element: <Movie />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
