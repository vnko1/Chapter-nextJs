"use client";

import React, { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { RegisterAccountValues } from "./RegisterForm.type";
import { validationSchema } from "./validationSchema";

const initialValues: RegisterAccountValues = {
  email: "",
  hash: "",
};
const RegisterForm: FC = () => {
  const [step, setStep] = useState(1);
  const isNextStep = step > 1;
  const methods = useForm({
    values: initialValues,
    mode: "all",
    resolver: yupResolver(validationSchema(isNextStep)),
  });

  return (
    <FormProvider {...methods}>
      <div>RegisterForm</div>
    </FormProvider>
  );
};

export default RegisterForm;
