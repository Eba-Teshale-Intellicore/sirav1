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
  // (error) => {
  //   return Promise.reject(error);
  // },
  (error) => {
    if (axios.isAxiosError(error)) {
      console.log("========== CREATE SERVICE ERROR ==========");
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("URL:", error.config?.url);
      console.log("METHOD:", error.config?.method);
    } else {
      console.log("UNKNOWN ERROR:", error);
    }
  },
);
