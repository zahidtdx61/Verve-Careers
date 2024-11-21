import AllJobs from "@/pages/AllJobs/AllJobs";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";

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
    ],
  },
]);

export default router;
