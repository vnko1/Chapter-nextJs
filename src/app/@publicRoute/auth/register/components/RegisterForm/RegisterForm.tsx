"use client";

import React, { FC, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { AxiosError } from "axios";

import { TextField, UIButton } from "@/components";
import { EndpointsEnum } from "@/types";
import { clientApi } from "@/utils";

import FormNotification from "../FormNotification/FormNotification";
import { validationSchema } from "./validationSchema";
import { FormValues } from "./RegisterForm.type";
import styles from "./RegisterForm.module.scss";

const initialValues: FormValues = {
  email: "",
  hash: "",
};
const RegisterForm: FC = () => {
  const [step, setStep] = useState(1);
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
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      if (step === 1) {
        await handleEmail(email);
        setStep(2);
      } else {
        await handleOtp(hash);
      }
      resetForm({ values: { email, hash } });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
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
