import * as yup from "../../../node_modules/yup/index";
export type PasswordValidationSchema = yup.ObjectSchema<{ password: string }>;
export type EmailValidationSchema = yup.ObjectSchema<{ email: string }>;
export interface ValidationResult {
  isValid: boolean;
  message: string;
}
