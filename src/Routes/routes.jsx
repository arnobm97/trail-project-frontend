import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/main";
import Home from "../pages/Home/Home/Home";
import Apartment from "../pages/Menu/Apartment/Apartment";
import Flat from "../pages/Menu/Flat/Flat";
import Bachelor from "../pages/Menu/Bachelor/Bachelor";
import SingleRoom from "../pages/Menu/SingleRoom/SingleRoom";
import WholeSpace from "../pages/Menu/WholeSpace/WholeSpace";
import Sell from "../pages/Menu/Sell/Sell";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AdminSignUp from "../pages/SignUp/AdminSignUp";
import CardDetails from "../pages/Menu/CardDetails/CardDetails";
import AllUsers from "../pages/Dashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../pages/Login/AdminLogin";
import AdminDashboard from "../pages/Dashboard/Dashboard";
import PropertiesTab from "../pages/Dashboard/Propertiestab";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import UsersTab from "../pages/Dashboard/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "apartment",
        element: <Apartment></Apartment>,
      },
      {
        path: "flat",
        element: <Flat></Flat>,
      },
      {
        path: "bachelor",
        element: <Bachelor></Bachelor>,
      },
      {
        path: "singleRoom",
        element: <SingleRoom></SingleRoom>,
      },
      {
        path: "wholeSpace",
        element: <WholeSpace></WholeSpace>,
      },
      {
        path: "sell",
        element: <Sell></Sell>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "adminsignup",
        element: <AdminSignUp></AdminSignUp>,
      },
      {
        path: "adminlogin",
        element: <AdminLogin></AdminLogin>,
      },
      {
        path: "user/dashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "card/:id",
        element: <CardDetails></CardDetails>,
      },
      {
        path: "user/dashboard",
        element: <UserDashboard></UserDashboard>,
      },
    ],
  },
  {
    path: "admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDashboard></AdminDashboard>
      </AdminRoute>
    ),
    children: [
      {
        path: "cart",
        element: (
          <AdminRoute>
            <Cart></Cart>
          </AdminRoute>
        ),
      },
      //admin routes
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UsersTab></UsersTab>
          </AdminRoute>
        ),
      },
      {
        path: "properties",
        element: (
          <AdminRoute>
            <PropertiesTab></PropertiesTab>
          </AdminRoute>
        ),
      },
    ],
  },
]);
