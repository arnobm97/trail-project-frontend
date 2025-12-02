import axios from "axios";

// Use only the Vercel backend URL
const baseURL = "https://trial-project-backend.vercel.app";

const axiosPublic = axios.create({
  baseURL: baseURL,
});

const useAxiosPublic = () => {
  console.log("Public Axios base URL:", baseURL);
  return axiosPublic;
};

export default useAxiosPublic;
