import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Result from "../pages/Result";
import BuyCredit from "../pages/BuyCredit";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/buy",
        element: <BuyCredit />,
      },
    ]
  },

]);

const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};

export default RoutesProvider;
