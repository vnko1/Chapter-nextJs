"use client";
import { FC } from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { AxiosError, AxiosResponse } from "axios";

import { PasswordField, TextField, UIButton } from "@/components";
import { EndpointsEnum, LinksEnum } from "@/types";
import { clientApi } from "@/utils";

import { FormValues, LoginResponse } from "./LoginForm.type";
import validationSchema from "./validationSchema";
import styles from "./LoginForm.module.scss";
import { handleLogin } from "@/lib";

const LoginForm: FC = () => {
  const onHandleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      const res: AxiosResponse<LoginResponse> = await clientApi.post(
        EndpointsEnum.LOGIN,
        values
      );

      handleLogin(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors(error.response?.data.message);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, isValid, dirty }: FormikProps<FormValues>) => (
          <Form>
            <TextField
              id="email"
              name="email"
              label="Your email"
              dataAutomation="emailInput"
              aria-label="Email field input"
            />
            <PasswordField
              id="password"
              name="password"
              label="Your password"
              dataAutomation="passwordInput"
              helperLink={{
                text: "Forgot password?",
                href: LinksEnum.FORGOT_PASSWORD,
              }}
              aria-label="Password field input"
            />
            <UIButton
              type="submit"
              fullWidth
              dataAutomation="submitButton"
              className={styles["button"]}
              disabled={!isValid || !dirty}
              isLoading={isSubmitting}
              aria-label="Submit form button"
            >
              Log in
            </UIButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
