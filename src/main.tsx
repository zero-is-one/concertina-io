import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { theme } from "./theme";

console.log("Version 0.0.3", import.meta.env.BASE_URL);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
);
