// import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://sirav1-1.onrender.com",
//   timeout: 10000,
//   // headers: {
//   //   "Content-Type": "application/json",
//   // },
// });
// import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://sirav1-1.onrender.com",
//   timeout: 15000,
// });
import axios from "axios";
import { getAccessToken } from "./authStorage";

export const api = axios.create({
  baseURL: "https://sirav1-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
