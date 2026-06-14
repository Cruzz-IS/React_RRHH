import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import TokenService from "../services/token.service";

const apiClient: AxiosInstance = axios.create({
  baseURL:         import.meta.env.VITE_API_URL ?? "http://localhost:5014/api",
  timeout:         Number(import.meta.env.VITE_API_TIMEOUT) || 30_000,
  headers:         { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject:  (reason: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else       resolve(token!);
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = TokenService.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    const originalRequest = error.config as
      InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/Auth/refresh-token")) {
      TokenService.clearAllTokens();
      window.dispatchEvent(new CustomEvent("auth:logout"));
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing            = true;

    const accessToken  = TokenService.getAccessToken();
    const refreshToken = TokenService.getRefreshToken();

    if (!refreshToken) {
      TokenService.clearAllTokens();
      window.dispatchEvent(new CustomEvent("auth:logout"));
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:5014/api";
      const { data } = await axios.post<{
        AccessToken: string;
        RefreshToken: string;
      }>(
        `${baseURL}/Auth/refresh-token`,
        { accessToken: accessToken ?? "", refreshToken },
        { withCredentials: true }
      );

      TokenService.setAccessToken(data.AccessToken);
      TokenService.setRefreshToken(data.RefreshToken);
      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${data.AccessToken}`;

      processQueue(null, data.AccessToken);

      originalRequest.headers.Authorization = `Bearer ${data.AccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError: unknown) {
      processQueue(refreshError, null);
      TokenService.clearAllTokens();
      window.dispatchEvent(new CustomEvent("auth:logout"));
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;

// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: { 'Content-Type': 'application/json' }
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Si es 401 y no hemos intentado refrescar ya
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const accessToken = localStorage.getItem('accessToken');

//         const { data } = await axios.post('/auth/refresh-token', {
//           accessToken,
//           refreshToken
//         });

//         localStorage.setItem('accessToken', data.accessToken);
//         localStorage.setItem('refreshToken', data.refreshToken);

//         // Reintentar la petición original con el nuevo token
//         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.clear();
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
