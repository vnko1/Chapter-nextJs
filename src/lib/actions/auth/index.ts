"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getIronSession } from "iron-session";

import { SessionData, defaultSession, sessionOptions, sleep } from "@/services";
import { CredType, IUser } from "@/types";
import { JSONParser } from "@/utils";

export async function getSession(shouldSleep = true) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.token = defaultSession.token;
  }

  if (shouldSleep) {
    await sleep(250);
  }

  return session;
}

export async function getParsedSession() {
  const data = await getSession();
  return JSONParser(data);
}

export async function handleAuth(token: string) {
  const session = await getSession(true);
  session.token = token;
  session.isLoggedIn = true;
  await session.save();
}

type LoginArgs = { user: IUser } & CredType;

export async function login({ token }: LoginArgs) {
  await handleAuth(token);
  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const session = await getSession(false);
  session.destroy();
  revalidatePath("/", "layout");
}
