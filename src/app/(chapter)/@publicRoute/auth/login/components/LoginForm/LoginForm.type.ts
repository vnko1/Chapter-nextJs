import { CredType, IUser } from "@/types";

export type FormValues = {
  email: string;
  password: string;
};

export type LoginResponse = { user: IUser } & CredType;
