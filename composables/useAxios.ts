import axios from "axios";

export const useAxios = () => {
  const apiBaseUrl = "/api";
  const instance = axios.create({
    baseURL: apiBaseUrl,
  });
  return instance;
};
