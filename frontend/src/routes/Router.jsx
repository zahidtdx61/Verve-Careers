import AppliedJobs from "@/pages/AppliedJobs/AppliedJobs";
import Job from "@/pages/Job/Job";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AllJobs from "../pages/AllJobs/AllJobs";
import Blog from "../pages/Blog/Blog";
import Blogs from "../pages/Blogs/Blogs";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import PrivateRoutes from "./PrivateRoutes";
import AddJob from "@/pages/AddJob/AddJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "join-us",
        element: <Registration />,
      },
      {
        path: "all-jobs",
        element: <AllJobs />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blog/:id",
        element: <Blog />,
      },
      {
        path: "job/:id",
        element: (
          <PrivateRoutes>
            <Job />
          </PrivateRoutes>
        ),
      },
      {
        path: "applied-jobs",
        element: (
          <PrivateRoutes>
            <AppliedJobs />
          </PrivateRoutes>
        ),
      },
      {
        path: "add-job",
        element: (
          <PrivateRoutes>
            <AddJob />
          </PrivateRoutes>
        ),
      }
    ],
  },
]);

export default router;
