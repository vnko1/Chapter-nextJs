import { SessionOptions } from "iron-session";

const sessionPass = process.env.SESSION_PASS as string;

export interface SessionData {
  username: string | number;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  username: "",
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
