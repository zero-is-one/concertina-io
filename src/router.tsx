import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { Game } from "./pages/PlayCooverNotation/Game";
import { MainMenu } from "./pages/PlayCooverNotation/MainMenu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "coover-notation",
    children: [
      {
        path: "start",
        element: <MainMenu />,
      },
      {
        path: "play",
        element: <Game />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
