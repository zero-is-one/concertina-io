import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import { PageHome } from "./components/PageHome/PageHome";
import { PageCreateInstrument } from "./components/PageCreateInstrument/PageCreateInstrument";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHome />,
  },
  {
    path: "/create",
    element: <PageCreateInstrument />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
