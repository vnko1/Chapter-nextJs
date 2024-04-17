"use client";
import { ChangeEvent, FC, useState, useEffect } from "react";
import { AxiosError } from "axios";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import cn from "classnames";

import { AccountCreationProps } from "./AccountCreation.type";
import { useRouter } from "next/navigation";

const AccountCreation: FC<AccountCreationProps> = ({ id }) => {
  const router = useRouter();
  return <div>AccountCreation:{id}</div>;
};

export default AccountCreation;
