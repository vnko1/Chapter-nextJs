"use server";
import { EndpointsEnum } from "@/types";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.VITE_API_BASE_URL;

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
    const token = cookies().get("token")?.value;
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
    const token = cookies().get("token")?.value;
    if (!token) return Promise.reject(error);

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._retry
    ) {
      error.config._isRetry = true;
      try {
        let apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL;
        if (apiBaseUrl[apiBaseUrl.length - 1] !== "/") {
          apiBaseUrl += "/";
        }
        const {
          data: { token, tokenExpires },
        }: AxiosResponse<{ token: string; tokenExpires: number }> =
          await axios.post(apiBaseUrl + EndpointsEnum.REFRESH, null, {
            withCredentials: true,
          });
        cookies().set("token", token, { expires: tokenExpires });

        return api.request(originalRequest);
      } catch (e) {
        cookies().delete("token");

        return Promise.reject(error);
      }
    }
    throw error;
  }
);

export default api;
