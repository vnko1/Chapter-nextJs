"use client";

import React, { FC, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";

import { TextField, UIButton } from "@/components";
import { EndpointsEnum, LinksEnum } from "@/types";
import { clientApi } from "@/services";

import FormNotification from "../FormNotification/FormNotification";
import { validationSchema } from "./validationSchema";
import { FormValues, OTPResponse } from "./RegisterForm.type";
import styles from "./RegisterForm.module.scss";

const initialValues: FormValues = {
  email: "",
  hash: "",
};
const RegisterForm: FC = () => {
  const [step, setStep] = useState(1);
  const { replace } = useRouter();
  const isNextStep = step > 1;

  const handleEmail = async (email: string) =>
    await clientApi.post(EndpointsEnum.REGISTRATION, {
      email,
    });

  const handleOtp = async (hash: string) =>
    await clientApi.post(EndpointsEnum.CONFIRM, {
      hash,
    });

  const onHandleSubmit = async (
    { email, hash }: FormValues,
    { resetForm, setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      if (step === 1) {
        await handleEmail(email);
        setStep(2);
      } else {
        const { data }: AxiosResponse<OTPResponse> = await handleOtp(hash);
        replace(LinksEnum.ACCOUNT_CREATION + "/" + data.id);
      }
      resetForm({ values: { email, hash } });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.data.error ===
          "This email has already been registered, but registration is not completed"
        )
          return setStep(2);

        if (error.response?.data.error === "notFound")
          console.log(error.response?.data);

        setFieldError(
          step === 1 ? "email" : "hash",
          error.response?.data.error
        );
      }
    }
  };

  return (
    <div className={styles["form"]}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(isNextStep)}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form>
            <TextField
              id="email"
              name="email"
              value={values.email}
              label="Your email"
              className={isNextStep ? styles["form__input"] : ""}
              disabled={isNextStep}
              aria-label="Email input field"
            />
            {isNextStep ? (
              <>
                <FormNotification />
                <TextField
                  id="hash"
                  name="hash"
                  label="Sign up code"
                  additionalLabel="It may take up to 2 minutes for the code to be sent."
                  value={values.hash}
                  aria-label="OTP input field"
                />
              </>
            ) : null}
            <UIButton
              className={styles["form__button"]}
              dataAutomation="submitButton"
              type="submit"
              aria-label="Submit form button"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
            >
              Create new account
            </UIButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
