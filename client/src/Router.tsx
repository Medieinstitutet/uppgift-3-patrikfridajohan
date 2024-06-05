import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { NotFound } from "./pages/NotFound";
import { Account } from "./pages/Account";
import { AdminDashboard } from "./pages/AdminDashboard";
import { HomePage } from "./pages/HomePage";
import { Dashboard} from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Subscriptions } from "./pages/Subscriptions";
import { Newsletter } from "./pages/Newsletter";
import { CreateNewsletter } from "./pages/CreateNewsletter";
import { ListNewsletters } from "./pages/ListNewsletters";
import { DisabledDash } from "./pages/DisabledDash";
import { Success } from "./pages/Success";




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
      {
        path: "dashboard",
        element: <DisabledDash />
      }
    ],
  },
  {
    path: "user",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard/>,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
      },
      {
        path:"newsletter/:id",
        element: <Newsletter/>
      },
      {
        path:"success",
        element:<Success/>
      }
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
      {
        path:"admindashboard/create-newsletter",
        element: <CreateNewsletter/>
      },
      {
        path:"admindashboard/list-newsletters",
        element: <ListNewsletters />
      }
    ],
  },
]);

