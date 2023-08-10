import * as yup from "../../../node_modules/yup/index";
export type PasswordValidationSchema = yup.StringSchema<string>;

export interface ValidationResult {
  isValid: boolean;
  message: string;
}
