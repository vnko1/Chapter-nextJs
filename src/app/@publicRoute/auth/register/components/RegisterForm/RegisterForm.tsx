"use client";

import React, { FC, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import { TextField, UIButton } from "@/components";
import { FormValues } from "./RegisterForm.type";
import { validationSchema } from "./validationSchema";
import FormNotification from "../FormNotification/FormNotification";
import styles from "./RegisterForm.module.scss";

const initialValues: FormValues = {
  email: "",
  hash: "",
};
const RegisterForm: FC = () => {
  const [step, setStep] = useState(1);
  const isNextStep = step > 1;

  const onHandleSubmit = (
    { email, hash }: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log("🚀 ~ data:", { email, hash });
    resetForm({ values: { email, hash } });
    setStep(2);
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
