import axios from "axios";
import { API_URL } from "@/config";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true,
  headers:{
    "Cache-Control":"no-cache, no-store, must-revalidate"
  }
});

export default api;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401) {
      window.location.href = "http://localhost:3000/auth/login";
    }
    return Promise.reject(error);
  }
);

