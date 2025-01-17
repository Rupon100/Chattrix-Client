import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main/Main";
import Joinus from "../Pages/Joinus";
import Register from "../Pages/Register";
import Error from "../Components/ErrorElement/Error";
import Home from "../Layout/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MyPost from "../UserDash/MyPost";
import MyProfile from "../UserDash/MyProfile";
import AddPost from "../UserDash/AddPost";
import Membership from "../Pages/Membership";
import AllComments from "../Pages/AllComments";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Joinus></Joinus>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/member',
                element: <PrivateRoute><Membership></Membership></PrivateRoute>
            },
            {
                path: '/comments/:id',
                element: <PrivateRoute><AllComments></AllComments></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'profile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: 'addpost',
                element: <PrivateRoute><AddPost></AddPost></PrivateRoute>
            },
            {
                path: 'mypost',
                element: <PrivateRoute><MyPost></MyPost></PrivateRoute>
            }
        ]
    }
])

export default Router;
