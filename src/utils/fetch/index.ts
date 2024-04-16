const BASE_URL = process.env.VITE_API_BASE_URL;

export async function fetchData(url: string, params: RequestInit) {
  const initParams = {
    headers: {
      "Content-Type": "application/json",
    },
    ...params,
  };
  const res = await fetch(BASE_URL + url, initParams);
  const data = await res.json();
  return data;
}
