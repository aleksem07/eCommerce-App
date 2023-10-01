import * as yup from "../../../node_modules/yup/index";

export type ValidationSchema = yup.StringSchema<string> | yup.DateSchema;

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}
