"use server";
import { cookies } from "next/headers";

import { EndpointsEnum } from "@/types";
import api from "@/lib/api";

export async function login(values: { email: string; password: string }) {
  const { data } = await api.post(EndpointsEnum.LOGIN, values);

  cookies().set("token", data.token, { expires: data.tokenExpires });
}
