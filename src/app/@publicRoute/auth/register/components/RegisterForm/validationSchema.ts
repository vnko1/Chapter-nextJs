import * as Yup from "yup";
import { emailValidation } from "@/utils";

export const validationSchema = (type: boolean) => {
  if (type)
    return Yup.object().shape({
      hash: Yup.string().required("Sign up code is required").trim(),
    });

  return Yup.object().shape({
    email: Yup.string()
      .matches(emailValidation, "Please enter a valid email address.")
      .required("Email is required")
      .trim(),
  });
};
