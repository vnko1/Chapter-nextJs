import Cookies from "js-cookie";

type Cookie = { [key: string]: string | number };

type CookieOptions = {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
};

export const getCookies = (...args: string[]) =>
  args.map((name) => Cookies.get(name));

export const setCookies = (cookies: Cookie, options?: CookieOptions) =>
  Object.keys(cookies).forEach((name) =>
    Cookies.set(name, String(cookies[name]), options)
  );

export const deleteCookies = (...args: string[]) =>
  args.forEach((name) => Cookies.remove(name));
