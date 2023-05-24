import axios from "axios";
export const useAxios = () => {
  const apiBaseUrl = "/api";

  const instance = axios.create({
    baseURL: apiBaseUrl,
  });

  instance.interceptors.request.use((config) => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    if (userData) {
      const token = userData.accessToken;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  });

  return instance;
};
