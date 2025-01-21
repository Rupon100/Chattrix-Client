import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // req interceptors to add authorization header for every secure call to the apis
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      
      console.log(" req stoped by interceptors", token);

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // interceptors 401 403  status
  axiosSecure.interceptors.response.use(
    function (respose) {
      return respose;
    },
    async (err) => {
      const status = err.response.status;
      console.log('error from, ', err)
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
        console.log("logging out from axiosSecure*");
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
