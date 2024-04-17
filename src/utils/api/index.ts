import axios, { AxiosResponse } from "axios";

import { getSession, handleAuth, logout } from "@/lib";
import { CredType, EndpointsEnum } from "@/types";
import { deleteCookies } from "../cookies";

const BASE_URL = "https://api-dev.chapter-web.com/api/v1/";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  method: "get, post, put, delete, patch",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use(
  async (config) => {
    const { token } = await getSession();

    if (token) config.headers.Authorization = "Bearer" + " " + token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { token } = await getSession();

    if (!token) return Promise.reject(error);

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._retry
    ) {
      error.config._isRetry = true;
      try {
        let apiBaseUrl: string = import.meta.env.API_BASE_URL;
        if (apiBaseUrl[apiBaseUrl.length - 1] !== "/") {
          apiBaseUrl += "/";
        }
        const {
          data: { token },
        }: AxiosResponse<CredType> = await axios.post(
          apiBaseUrl + EndpointsEnum.REFRESH,
          null,
          {
            withCredentials: true,
          }
        );
        await handleAuth(token);

        return api.request(originalRequest);
      } catch (e) {
        deleteCookies("token");
        logout();
        return Promise.reject(error);
      }
    }
    throw error;
  }
);

export default api;
