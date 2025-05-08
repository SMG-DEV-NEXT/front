// lib/api.js (or utils/api.js)

import axios from "axios";
import { toast } from "react-toastify";
import { toastError } from "./utils/error";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "./utils/token";
// Base URL for your API (adjust the URL for your NestJS app)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Change it to your actual backend URL
// Axios instance for logged-in routes (with JWT Authorization Header)
export const axiosLoggedIn = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // To send cookies (important for HTTP-only cookies)
});

// Axios instance for non-logged-in routes (no Authorization header)
export const axiosWithoutAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies for all requests if needed
});

axiosWithoutAuth.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle validation errors from Nest.js
      if (status === 400 && data.message) {
        if (Array.isArray(data.message)) {
          data.message.forEach((msg) => toastError(msg));
        } else {
          toastError(data.message);
        }
      } else if (status === 401) {
        toast.error("Unauthorized! Please log in.");
      } else if (status === 403) {
        toast.error("Forbidden! You do not have access.");
      } else if (status === 404) {
        toast.error("Resource not found.");
      } else if (status === 500) {
        toast.error("Server error! Please try again later.");
      } else {
        toast.error("An error occurred.");
      }
    } else {
      toast.error("Network error! Please check your connection.");
    }

    return Promise.reject(error);
  }
);

// Add a request interceptor to include the Authorization token for logged-in users
axiosLoggedIn.interceptors.request.use(
  (config) => {
    // Get the token from the cookies (or from local storage, depending on how you store it)
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.withCredentials = true;

    return config;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      // Handle validation errors from Nest.js
      if (status === 400 && data.message) {
        if (Array.isArray(data.message)) {
          data.message.forEach((msg) => toastError(msg));
        } else {
          toastError(data.message);
        }
      } else if (status === 401) {
        toast.error("Unauthorized! Please log in.");
      } else if (status === 403) {
        toast.error("Forbidden! You do not have access.");
      } else if (status === 404) {
        toast.error("Resource not found.");
      } else if (status === 500) {
        toast.error("Server error! Please try again later.");
      } else {
        toast.error("An error occurred.");
      }
    } else {
      toast.error("Network error! Please check your connection.");
    }

    return Promise.reject(error);
  }
);

axiosLoggedIn.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;
      // Handle validation errors from Nest.js
      if (status === 400 && data.message) {
        if (Array.isArray(data.message)) {
          data.message.forEach((msg) => toastError(msg));
        } else {
          toastError(data.message);
        }
      } else if (status === 401) {
        toast.error("Unauthorized! Please log in.");
      } else if (status === 403) {
        toast.error("Forbidden! You do not have access.");
      } else if (status === 404) {
        toast.error("Resource not found.");
      } else if (status === 500) {
        toast.error("Server error! Please try again later.");
      } else {
        toast.error("An error occurred.");
      }
    } else {
      toast.error("Network error! Please check your connection.");
    }
    if (error?.status === 401) {
      try {
        const { data } = await axiosWithoutAuth.get("/auth/verify");
        setAccessToken(data.token);
        error.config.headers.Authorization = `Bearer ${data.token}`;
        return AxiosClassic(error.config);
      } catch (error) {
        removeAccessToken();
        window.location.href = "/";
      }
    }
  }
);

export default {
  axiosLoggedIn,
  axiosWithoutAuth,
};
