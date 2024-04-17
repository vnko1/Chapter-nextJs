"use client";
import { ChangeEvent, FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import cn from "classnames";

import { emojiRegex, getDataFromLS } from "@/utils";
import { useDebounce } from "@/hooks";
import { clientApi } from "@/services";
import { EndpointsEnum, LinksEnum } from "@/types";
import { PasswordField, TextField, UIButton } from "@/components";
import { AccountCreationProps, FormValues } from "./AccountCreation.type";
import styles from "./AccountCreation.module.scss";
import validationSchema from "./validationSchema";

const initialValues: FormValues = {
  fullName: "",
  nickName: "",
  password: "",
  confirm_password: "",
};

const AccountCreation: FC<AccountCreationProps> = ({ id }) => {
  const router = useRouter();
  const [nkIsLoading, setNkIsLoading] = useState(false);
  const [nkErrorMessage, setNkErrorMessage] = useState<string | null>(null);
  const [errorMessageForm, setErrorMessageForm] = useState<
    string | null | undefined
  >(null);
  const [nickname, setNickname] = useState<string>("");
  const debouncedNickname = useDebounce(nickname, 500);

  useEffect(() => {
    if (debouncedNickname !== "") {
      handleNicknameChange(debouncedNickname);
    }

    if (debouncedNickname.length < 8) setNkErrorMessage(null);
  }, [debouncedNickname]);

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

      router.push(LinksEnum.LOG_IN);
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

  const onHandleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      !e.currentTarget.value.startsWith("@") &&
      e.currentTarget.value.length
    ) {
      return setNickname(
        "@" + e.currentTarget.value.replace(" ", "").replace(emojiRegex, "")
      );
    }
    setNickname(e.currentTarget.value.replace(" ", "").replace(emojiRegex, ""));
  };

  const onHandleChange = (
    e: ChangeEvent<HTMLInputElement>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    e.target.value = e.target.value.replace(" ", "").replace(emojiRegex, "");
    handleChange(e);
  };

  return (
    <div className={cn(styles["form"])}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateAccount}
      >
        {({
          isSubmitting,
          isValid,
          dirty,
          values,
          handleChange,
        }: FormikProps<FormValues>) => (
          <Form>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={getDataFromLS("email") || ""}
              className="invisible"
              aria-label="Email input field"
            />
            <TextField
              id="fullName"
              name="fullName"
              label="Full name"
              value={values.fullName}
              placeholder="ex. John Brick, Dina O’neal, Jonathan... "
              dataAutomation="fullNameField"
              showSuccessIcon={true}
              aria-label="Full name input field"
              onChange={(e) => {
                e.target.value = e.target.value.replace(emojiRegex, "");
                handleChange(e);
              }}
            />
            <TextField
              id="nickName"
              name="nickName"
              label="Nickname"
              value={nickname}
              aria-label="Nickname input field"
              placeholder="@JaneSMTH"
              dataAutomation="nicknameField"
              showSuccessIcon={true}
              onChange={onHandleChangeNickname}
              customErrorMessage={nkErrorMessage}
            />
            <PasswordField
              id="password"
              name="password"
              label="Create password"
              aria-label="Password input field"
              placeholder="Enter your password"
              strength
              dataAutomation="passwordField"
              onChange={(e) => onHandleChange(e, handleChange)}
            />
            <PasswordField
              id="confirm_password"
              name="confirm_password"
              label="Confirm password"
              aria-label="Confirm password input field"
              placeholder="Re-enter your password"
              dataAutomation="confirm_passwordField"
              onChange={(e) => onHandleChange(e, handleChange)}
            />
            <UIButton
              type="submit"
              fullWidth
              dataAutomation="submitButton"
              className={styles["button"]}
              disabled={!isValid || !dirty || !!nkErrorMessage || nkIsLoading}
              isLoading={isSubmitting}
              aria-label="Submit form button"
            >
              Save changes
            </UIButton>
            {errorMessageForm ? (
              <p className="text-red text-s text-center mt-1 mr-2">
                {errorMessageForm}
              </p>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountCreation;
