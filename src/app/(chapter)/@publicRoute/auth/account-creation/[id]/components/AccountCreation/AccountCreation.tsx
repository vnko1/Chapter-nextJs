"use client";
import { ChangeEvent, FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import cn from "classnames";

import { getDataFromLS } from "@/utils";
import { useDebounce } from "@/hooks";
import { clientApi } from "@/services";
import { EndpointsEnum, LinksEnum } from "@/types";
import { AccountCreationProps, FormValues } from "./AccountCreation.type";

const AccountCreation: FC<AccountCreationProps> = ({ id }) => {
  const router = useRouter();
  const [nkIsLoading, setNkIsLoading] = useState(false);
  const [nkErrorMessage, setNkErrorMessage] = useState<string | null>(null);
  const [errorMessageForm, setErrorMessageForm] = useState<
    string | null | undefined
  >(null);
  const [nickname, setNickname] = useState<string>("");
  const debouncedNickname = useDebounce(nickname, 500);

  async function handleNicknameChange(nickname: string) {
    if (nickname.trim().length < 3) return;
    try {
      setNkErrorMessage(null);
      setNkIsLoading(true);
      await clientApi.post(
        `${EndpointsEnum.NICKNAME_VALIDATION}/${nickname}`,
        null
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        if (
          e.response?.data.error === "User with this nickname already exists."
        ) {
          return setNkErrorMessage(e.response?.data.error);
        }
      }
    } finally {
      setNkIsLoading(false);
    }
  }

  async function handleCreateAccount(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) {
    try {
      setErrorMessageForm(null);
      setSubmitting(true);

      const [firstName, lastName = ""] = values.fullName
        .trim()
        .split(" ")
        .filter((el) => el);

      const { nickName, confirm_password, password } = values;

      await clientApi.patch(`${EndpointsEnum.REGISTRATION_FINALLY}/${id}`, {
        nickName,
        password,
        confirmPassword: confirm_password,
        firstName,
        lastName,
        IsAccessCookie: !!getDataFromLS("cookieAccept") || false,
        email: getDataFromLS("email"),
      });

      router.replace(LinksEnum.LOG_IN);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorMessageForm(
          e.response?.data.message ||
            e.response?.data.error ||
            e.response?.data.errors.password
        );
      }
      setSubmitting(false);
    }
  }

  return <div>AccountCreation:{id}</div>;
};

export default AccountCreation;
