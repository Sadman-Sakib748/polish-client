// src/hooks/useAxiosSecure.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://b11a11-server-side-sadman-sakib748.vercel.app",
  withCredentials: true, 
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
