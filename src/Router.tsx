import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Member from "./pages/Member";
import MemberBadges from "./pages/sub-pages/member/MemberBadges";
import MemberConnects from "./pages/sub-pages/member/MemberConnects";
import MemberReviews from "./pages/sub-pages/member/MemberReviews";
import Books from "./pages/Books";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import EmptyLayout from "./pages/EmptyLayout";
import Tvs from "./pages/Tvs";
import Tv from "./pages/Tv";
import TvOverview from "./pages/sub-pages/tv/TvOverview";
import TvSeasons from "./pages/sub-pages/tv/TvSeasons";
import Season from "./pages/Season";
import TvSerise from "./pages/sub-pages/tv/TvSerise";
import TvEpisode from "./pages/sub-pages/tv/TvEpisode";
import TvSeason from "./pages/sub-pages/tv/TvSeason";
import MovieInfo from "./pages/sub-pages/movies/MovieInfo";
import MovieOverview from "./pages/sub-pages/movies/MovieOverview";
import MovieCollection from "./pages/sub-pages/movies/MovieCollection";
import Collection from "./pages/Collection";
import Rewards from "./pages/Rewards";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
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
            index: true,
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
            index: true,
            element: <Movies />,
          },
          {
            path: ":id",
            element: <Movie />,
            children: [
              {
                element: <MovieInfo />,
                children: [
                  {
                    index: true,
                    element: <MovieOverview />,
                  },
                  {
                    path: "collection",
                    element: <MovieCollection />,
                  },
                ],
              },
            ],
          },
          {
            path: "collection/:id",
            element: <Collection />,
          },
        ],
      },
      {
        path: "tvs",
        element: <EmptyLayout />,
        children: [
          {
            index: true,
            element: <Tvs />,
          },
          {
            path: ":id",
            element: <Tv />,
            children: [
              {
                element: <TvSerise />,
                children: [
                  {
                    index: true,
                    element: <TvOverview />,
                  },
                  {
                    path: "seasons",
                    element: <TvSeasons />,
                  },
                ],
              },
              {
                path: "seasons/:number",
                element: <Season />,
                children: [
                  {
                    index: true,
                    element: <TvSeason />,
                  },
                  {
                    path: "episodes/:episodeNumber",
                    element: <TvEpisode />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "rewards",
        element: <Rewards />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
