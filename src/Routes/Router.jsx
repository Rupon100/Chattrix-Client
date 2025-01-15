import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main/Main";
import Joinus from "../Pages/Joinus";
import Register from "../Pages/Register";
import Error from "../Components/ErrorElement/Error";
import Home from "../Layout/Home/Home";

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
                path: '/joinus',
                element: <Joinus></Joinus>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])

export default Router;
