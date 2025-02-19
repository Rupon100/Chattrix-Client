import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useUsers from '../Hooks/useUsers';

const AdminCheckRoute = ({children}) => {
    const { user, loading } = useAuth(); 
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