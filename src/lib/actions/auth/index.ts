"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { fetchData } from "@/lib";
import { EndpointsEnum } from "@/types";
import { revalidatePath } from "next/cache";

export async function login(values: { email: string; password: string }) {
  const data = await fetchData(EndpointsEnum.LOGIN, {
    method: "POST",
    body: JSON.stringify(values),
  });

  cookies().set("token", data.token, { expires: data.tokenExpires });
  revalidatePath("/", "layout");
  redirect("/");
}
