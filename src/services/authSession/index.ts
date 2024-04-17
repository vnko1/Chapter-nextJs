import { IUser } from "@/types";
import { defaultSessionUserState } from "@/utils";
import { SessionOptions } from "iron-session";

const sessionPass = process.env.SESSION_PASS as string;

export interface SessionData {
  user: Pick<IUser, "id" | "avatarUrl" | "email" | "nickName">;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  user: defaultSessionUserState,
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: sessionPass,
  cookieName: "user",
  cookieOptions: {
    secure: true,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
