import { IUser } from "@/types";
import { defaultUserState } from "@/utils";
import { SessionOptions } from "iron-session";

const sessionPass = process.env.SESSION_PASS as string;

export interface SessionData {
  user: IUser;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  user: defaultUserState,
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
