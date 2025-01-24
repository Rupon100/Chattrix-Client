import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const AdminCheckRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext); 
  
    if (loading) {
      return (
        <div className="flex justify-center items-center w-full min-h-screen ">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }
  
    if (user?.role === "admin" || user?.email === "admin@gmail.com") {
      return children;
    }
  
    return <Navigate to={`/login`}></Navigate>;
};

export default AdminCheckRoute;