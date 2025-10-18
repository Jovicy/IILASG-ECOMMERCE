import axios from "axios";
import { tokenService } from "./tokenService";
import { store } from "@/store/store";
import { clearAuth } from "@/store/slices/authSlice";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      store.dispatch(clearAuth());
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // ✅ If 401 — attempt refresh if not retried already
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((error) => Promise.reject(error));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = tokenService.getRefreshToken();

        if (!refreshToken) {
          store.dispatch(clearAuth());

          return Promise.reject(err);
        }

        // ✅ Request new tokens
        const { data } = await axios.post(`${BASE_URL}/auth/refreshtoken`, { refreshToken });

        tokenService.setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        apiClient.defaults.headers.Authorization = "Bearer " + data.accessToken;
        processQueue(null, data.accessToken);

        return apiClient(originalRequest);
      } catch (refreshErr: any) {
        // 🚫 Refresh failed → clear and redirect
        processQueue(refreshErr, null);
        store.dispatch(clearAuth());

        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    // ✅ If 403 or other auth failure — logout
    if (err.response?.status === 403) {
      store.dispatch(clearAuth());
    }

    return Promise.reject(err);
  }
);

export default apiClient;
