"use server";

import { fetchData } from "@/utils";
import { EndpointsEnum } from "@/types";

export async function login(values: { email: string; password: string }) {
  const data = await fetchData(EndpointsEnum.LOGIN, {
    method: "POST",
    body: JSON.stringify(values),
  });

  console.log("🚀 ~ login ~ data:", data.token);
}
