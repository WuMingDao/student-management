import * as yup from "yup";

const baseAuthSchema = yup
  .object({
    email: yup
      .string()
      .required("email not for empty")
      .email("Please type vail email"),
    password: yup
      .string()
      .required("password not for empty")
      .min(6, "password must be at least 6 characters"),
  })
  .required();

export const loginValidationSchema = baseAuthSchema;

export const signupValidationSchema = baseAuthSchema.concat(
  yup.object({
    confirmPassword: yup
      .string()
      .required()
      .min(6)
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
);
