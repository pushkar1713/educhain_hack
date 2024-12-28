import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/body";

const Router = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Router;
