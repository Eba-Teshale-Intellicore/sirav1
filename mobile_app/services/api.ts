import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "./authStorage";

export const api = axios.create({
  baseURL: "https://sirav1-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ================================
// REQUEST INTERCEPTOR
// ================================

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

// ================================
// RESPONSE INTERCEPTOR
// ================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only handle 401
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          await clearTokens();
          return Promise.reject(error);
        }

        const response = await axios.post(
          "https://sirav1-1.onrender.com/api/v1/auth/token/refresh/",
          {
            refresh: refreshToken,
          },
        );

        const newAccessToken = response.data.access;

        await saveTokens(newAccessToken, refreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        await clearTokens();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
