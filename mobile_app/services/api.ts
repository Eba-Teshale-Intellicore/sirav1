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

// =========================================================
// REQUEST INTERCEPTOR
// Automatically attach access token
// =========================================================

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

// =========================================================
// RESPONSE INTERCEPTOR
// Automatically refresh expired access token
// =========================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only handle 401 errors
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();

        // No refresh token → user must login again
        if (!refreshToken) {
          await clearTokens();

          return Promise.reject(error);
        }

        console.log("ACCESS TOKEN EXPIRED → REFRESHING");

        // IMPORTANT:
        // Use axios directly, NOT `api`
        // so this refresh request doesn't trigger
        // the interceptor again.
        const response = await axios.post(
          "https://sirav1-1.onrender.com/api/v1/auth/token/refresh/",
          {
            refresh: refreshToken,
          },
        );

        const newAccessToken = response.data.access;

        console.log("NEW ACCESS TOKEN RECEIVED");

        // Save new access token.
        // Keep existing refresh token.
        await saveTokens(newAccessToken, refreshToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        console.log(
          "RETRYING:",
          originalRequest.method?.toUpperCase(),
          originalRequest.url,
        );

        return api(originalRequest);
      } catch (refreshError) {
        console.log("REFRESH TOKEN FAILED");

        // Refresh token is invalid/expired
        await clearTokens();

        return Promise.reject(refreshError);
      }
    }

    // Any other error
    return Promise.reject(error);
  },
);
