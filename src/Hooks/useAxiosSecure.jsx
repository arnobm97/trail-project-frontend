import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// Determine API base URL
const getBaseUrl = () => {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://localhost:5000";
  }
  return "https://trial-project-backend.vercel.app";
};

const axiosSecure = axios.create({
  baseURL: getBaseUrl(),
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  console.log("Axios base URL:", getBaseUrl());

  // Request interceptor to add authorization header
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response?.status;
      console.log("Axios error status:", status);

      // For 401 or 403, logout the user
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
