import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import { PageHome } from "./components/PageHome/PageHome";
import { PageInstrumentEditor } from "./components/PageInstrumentEditor/PageInstrumentEditor";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageHome />,
  },
  {
    path: "/edit/:id",
    element: <PageInstrumentEditor />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
