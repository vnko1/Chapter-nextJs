"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.VITE_API_BASE_URL;

export async function fetchData(url: string, params?: RequestInit) {
  const token = cookies().get("token")?.value;
  const initParams = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...params,
  };
  const res = await fetch(BASE_URL + url, initParams);
  const data = await res.json();
  return data;
}
