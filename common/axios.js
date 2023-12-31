import axios from "axios";
const apiBaseUrl = "/api";
import authService from "~/common/auth.service";
import { getAccessToken, getRefreshToken } from "./localstorage.service";

const instance = axios.create({
  baseURL: apiBaseUrl,
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        originalRequest._retry = true;
        try {
          const accessToken = await authService.refreshToken(refreshToken);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + accessToken;
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          return instance(originalRequest);
        } catch (refreshError) {
          // Handle refresh token error (e.g., show error message, redirect to login page)
          // Example: Redirect to the login page
          window.location.href = "/sign-in";
        }
      } else {
        // Handle missing refresh token (e.g., show error message, redirect to login page)
        console.error("Refresh token is missing");
        // Example: Redirect to the login page
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
