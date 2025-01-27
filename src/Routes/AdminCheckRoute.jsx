import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAuth from '../Hooks/useAuth';
import useUsers from '../Hooks/useUsers';

const AdminCheckRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext); 
    const [users, isLoading] = useUsers();
  
    if (isLoading || loading) {
      return (
        <div className="flex justify-center items-center w-full min-h-screen ">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }
  
    if (users?.role === "admin") {
      return children;
    }
  
    return <Navigate to={`/login`}></Navigate>;
};

export default AdminCheckRoute;