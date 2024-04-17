export enum EmailStatus {
  CONFIRMED = "This email is already registered with an active account",
  UNCONFIRMED = "This email has already been registered, but is not confirmed",
  REGISTRATION_UNCOMPLETED = "This email has already been registered, but registration is not completed",
  INVALID_HASH = "Hash is not valid.",
}

export type FormValues = {
  email: string;
  hash: string;
};

export type OTPResponse = { id: number; email: string };
