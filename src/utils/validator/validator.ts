import * as yup from "yup";
import { PasswordValidationSchema, ValidationResult } from "./validator.types";
export default class ValidatorUtil {
  passwordSchema: PasswordValidationSchema;

  constructor() {
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
  validateEmail(email: string): ValidationResult {
    const [emailname, domain] = email.split("@");
    const emailRegex = /^\S+@\S+\.\S+$/;
    const invalidAnswer: ValidationResult = { isValid: false, message: "" };
    if (!emailname) {
      invalidAnswer.message = "Email address is missing username.";
      return invalidAnswer;
    }
    if (!email.includes("@")) {
      invalidAnswer.message = "Email address should contain an '@' symbol.";
      return invalidAnswer;
    }
    if (!domain) {
      invalidAnswer.message = "Email address is missing domain name.";
      return invalidAnswer;
    }
    if (!email.includes(".")) {
      invalidAnswer.message = "Email address should contain a '.' symbol.";
      return invalidAnswer;
    }
    if (email.trim() !== email) {
      invalidAnswer.message = "Email address should not contain leading or trailing whitespace.";
      return invalidAnswer;
    }
    if (!emailRegex.test(email)) {
      invalidAnswer.message = "Email address is not properly formatted.";
      return invalidAnswer;
    }
    return {
      isValid: true,
      message: " ",
    };
  }

  validatePassword(password: string): ValidationResult {
    try {
      this.passwordSchema.validateSync({ password });
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
