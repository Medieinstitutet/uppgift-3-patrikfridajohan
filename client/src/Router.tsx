import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { NotFound } from "./pages/NotFound";
import { Account } from "./pages/Account";
import { AdminDashboard } from "./pages/AdminDashboard";
import { HomePage } from "./pages/HomePage";
import { LoggedDashboard } from "./pages/LoggedDashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Subscriptions } from "./pages/Subscriptions";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "user",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "loggeddashboard",
        element: <LoggedDashboard />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
      },
    ],
  },
  {
    path: "admin",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "admindashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

