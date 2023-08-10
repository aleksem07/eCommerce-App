import * as yup from "../../../node_modules/yup/index";
export type PasswordValidationSchema = yup.ObjectSchema<{ password: string }>;
export type EmailValidationSchema = yup.ObjectSchema<{ email: string }>;
