"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getIronSession } from "iron-session";

import { SessionData } from "@/services";
import { defaultSession, sessionOptions, sleep } from "@/services";
import { CredType, IUser } from "@/types";

export async function getSession(shouldSleep = true) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.user = defaultSession.user;
  }

  if (shouldSleep) {
    await sleep(250);
  }

  return session;
}

type LoginArgs = { user: IUser } & CredType;

export async function login({ user, token, tokenExpires }: LoginArgs) {
  cookies().set("token", token, {
    expires: tokenExpires,
    secure: true,
  });

  const session = await getSession();
  session.user = user;
  session.isLoggedIn = true;
  await session.save();

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const session = await getSession(false);
  session.destroy();
  revalidatePath("/", "layout");
}
