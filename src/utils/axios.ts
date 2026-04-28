import axios from "axios";
import refreshToken from "./refreshToken";
import { useAuthStore } from "../stores/authStore";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        useAuthStore.setState({
          accessToken: newAccessToken,
        });

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      }

      useAuthStore.getState().clearTokens();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;