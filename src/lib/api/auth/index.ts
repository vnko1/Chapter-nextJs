"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.API_BASE_URL;

export async function fetchData(url: string, params?: RequestInit) {
  const cookiesList = cookies();
  const token = cookiesList.get("token")?.value;

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
