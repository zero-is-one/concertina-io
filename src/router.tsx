import { createBrowserRouter } from "react-router-dom";
import { ExercisePlay } from "./components/ExercisePlay/ExercisePlay";
import { ExerciseStart } from "./components/ExerciseStart/ExerciseStart";
import { HomePage } from "./components/HomePage/HomePage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/exercise/:exerciseId/start",
      element: <ExerciseStart />,
    },
    {
      path: "/exercise/:exerciseId/play",
      element: <ExercisePlay />,
    },
    {
      path: "*",
      element: <div>404 Not Found</div>,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
