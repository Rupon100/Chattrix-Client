import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useUsers from "../Hooks/useUsers";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [users] = useUsers();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={`/login`} state={{ form: location }} replace></Navigate>;
};

export default PrivateRoute;
