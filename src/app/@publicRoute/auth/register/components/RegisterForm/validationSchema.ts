import * as Yup from "yup";
import { emailValidation } from "@/utils";

export const validationSchema = (showHash: boolean) => {
  if (type) return Yup.object().shape({});

  return Yup.object().shape({
    email: Yup.string()
      .matches(emailValidation, "Please enter a valid email address.")
      .required("Email is required")
      .trim(),
    hash: Yup.string().trim().when(),
  });
};

export const schema = Yup.object().shape({
  email: Yup.string()
    .matches(emailValidation, "Please enter a valid email address.")
    .required("Email is required")
    .trim(),
});
