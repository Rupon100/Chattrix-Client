import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main/Main";
import Joinus from "../Pages/Joinus";
import Register from "../Pages/Register";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        // errorElement: ,
        children: [
            {
                path: '/',
                element: <App></App>
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
