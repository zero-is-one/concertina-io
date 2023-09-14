import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import { PageHome } from "./components/PageHome/PageHome";
import { PageCreateLayout } from "./components/PageCreateLayout/PageCreateLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHome />,
  },
  {
    path: "/layout",
    element: <PageCreateLayout />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
