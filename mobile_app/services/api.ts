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
    Accept: "application/json",
  },
});

// =========================================================
// REQUEST INTERCEPTOR
// =========================================================

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("API REQUEST:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      hasAuth: !!config.headers?.Authorization,
    });

    return config;
  },
  (error) => Promise.reject(error),
);

// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          await clearTokens();
          return Promise.reject(error);
        }

        console.log("ACCESS TOKEN EXPIRED → REFRESHING");

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
        console.log("REFRESH TOKEN FAILED");

        await clearTokens();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
