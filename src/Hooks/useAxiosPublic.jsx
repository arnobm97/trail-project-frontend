import axios from "axios";

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

const axiosPublic = axios.create({
  baseURL: getBaseUrl(),
});

const useAxiosPublic = () => {
  console.log("Public Axios base URL:", getBaseUrl());
  return axiosPublic;
};

export default useAxiosPublic;
