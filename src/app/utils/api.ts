"use client";

import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required for httpOnly cookies
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Request interceptor - add access token to requests
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 and refresh token
api.interceptors.response.use(
  (response) => {
    // Check if server sent a new access token in header (from authMiddleware refresh)
    const newToken = response.headers["x-access-token"];
    if (newToken) {
      Cookies.set("token", newToken, { expires: 1 / 24 }); // ~1 hour
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/brand/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;

        if (accessToken) {
          Cookies.set("token", accessToken, { expires: 1 / 24 }); // ~1 hour
          processQueue(null, accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        // Clear tokens and redirect to login
        Cookies.remove("token");
        Cookies.remove("admin");
        Cookies.remove("brand");

        // Only redirect if we're in browser context
        if (typeof window !== "undefined") {
          window.location.href = "/app/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
