import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout defaultMonth="3" />,
  },
  {
    path: "/:month",
    element: <HomeLayout />,
  },
]);

function App() {
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
