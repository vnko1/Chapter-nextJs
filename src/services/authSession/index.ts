import { SessionOptions } from "iron-session";

const sessionPass = process.env.SESSION_PASS as string;

export interface SessionData {
  token: string | null;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  token: null,

  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: sessionPass,
  cookieName: "user",
  ttl: 15 * 60,
  cookieOptions: {
    secure: true,
  },
};
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
