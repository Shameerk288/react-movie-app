import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Rated from "./routes/rated.tsx";
import Home from "./routes/home.tsx";
import Auth from "./routes/login.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Movie from "./routes/movie.tsx";
import TvShow from "./routes/tvshow.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/rated",
        element: <Rated />,
      },
      { path: "/login", element: <Auth /> },
      { path: "/movie/:id", element: <Movie /> },
      { path: "/tvshow/:id", element: <TvShow /> },
      // {
      //   path: "/movie/:id/add-rating",
      //   element: <Movie />,
      //   action: createPostAction,
      // },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
