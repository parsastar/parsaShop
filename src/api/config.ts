import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000/",
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || { message: "مشکل در سرور" })
);

export { api };
