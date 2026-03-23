import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Authentication/LoginForm";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import ProfilePage from "../pages/dashboard/ProfilePage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
      {
        index:true,
        Component: Home
      },
      {
        path:'/login',
        Component: Login
      },
      {
        path:'/register',
        Component: Register
      },
      {
        path:'/dashboard',
        Component: DashboardLayout,
        children:[
          {
            index:true,
            Component: ProfilePage,
          }
        ]
      }
    ]
  },
  {
  path: "*",
  element: <NotFound />
}
]);