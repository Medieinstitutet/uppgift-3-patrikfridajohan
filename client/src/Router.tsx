import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { NotFound } from "./pages/NotFound";
import { Account } from "./pages/Account";
import { AdminDashboard } from "./pages/AdminDashboard";
import { HomePage } from "./pages/HomePage";
import { Dashboard} from "./pages/Dashboard";
import { Articles } from "./pages/Articles";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Subscriptions } from "./pages/Subscriptions";
// import { Newsletter } from "./pages/Newsletter";
import { About } from "./pages/About";
import { CreateNewsarticle } from "./pages/CreateNewsarticle";
import { ListNewsarticles } from "./pages/ListNewsarticles";
import { Success } from "./pages/Success";
import { Plans } from "./pages/Plans";
import { Articlesforme } from "./pages/Articlesforme";
import { Article } from "./pages/ArticlePage";

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
        path: "about",
        element: <About />,
      },
      {
        path: "plans",
        element: <Plans />,
      },
      {
        path: "articles",
        element: <Articles />
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
        path:"article/:id",
        element: <Article/>
      },
      {
        path:"articlesforme",
        element: <Articlesforme/>
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
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path:"create-newsarticle",
        element: <CreateNewsarticle/>
      },
      {
        path:"list-newsarticles",
        element: <ListNewsarticles />
      }
    ],
  },
]);

