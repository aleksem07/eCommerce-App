import * as yup from "yup";
import { ValidationSchema, ValidationResult } from "./validator.types";

export default class ValidatorUtil {
  passwordSchema: ValidationSchema;
  emailSchema: ValidationSchema;

  constructor() {
    this.emailSchema = yup
      .string()
      .trim()
      .email("Invalid email address(example@gmail.com)")
      .min(3)
      .required("Email is required");
    this.passwordSchema = yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .matches(/^[^\s]+$/, "Password must not contain leading or trailing whitespace")
      .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
      .required("Password is required");
  }

  validatePassword(password: string): ValidationResult {
    try {
      this.passwordSchema.validateSync(password);

      return {
        isValid: true,
        message: " ",
      };
    } catch (error) {
      return {
        isValid: false,
        message: (error as Error).message,
      };
    }
  }

  validateEmail(email: string): ValidationResult {
    try {
      this.emailSchema.validateSync(email);

      return {
        isValid: true,
        message: " ",
      };
    } catch (error) {
      return {
        isValid: false,
        message: (error as Error).message,
      };
    }
  }
}
