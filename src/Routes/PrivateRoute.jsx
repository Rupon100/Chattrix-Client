import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

 

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();


    if(loading){
        <span className="loading loading-spinner loading-lg"></span>
    }


    if(user){
        return children;
    }

    return <Navigate to={`/login`} state={{form: location}} replace ></Navigate>;
};
 
export default PrivateRoute;