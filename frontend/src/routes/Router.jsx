import AddJob from "@/pages/AddJob/AddJob";
import AppliedJobs from "@/pages/AppliedJobs/AppliedJobs";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Job from "@/pages/Job/Job";
import MyJobs from "@/pages/MyJobs/MyJobs";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AllJobs from "../pages/AllJobs/AllJobs";
import Blog from "../pages/Blog/Blog";
import Blogs from "../pages/Blogs/Blogs";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
      },
      {
        path: "my-jobs",
        element: (
          <PrivateRoutes>
            <MyJobs />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
