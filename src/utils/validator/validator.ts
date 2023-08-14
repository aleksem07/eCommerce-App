import { string, ValidationError } from "yup";
import { ValidationSchema, ValidationResult } from "./validator.types";

export default class ValidatorUtil {
  passwordSchema: ValidationSchema;
  emailSchema: ValidationSchema;

  constructor() {
    this.emailSchema = string()
      .matches(/@/, "Email address must contain a period (@)")
      .matches(/\./, "Email address must contain a period (.)")
      .matches(/^[^\s]+$/, "Password must not contain leading or trailing whitespace")
      .email("Invalid email address(example@gmail.com)")

      .min(3)
      .required("Email is required");
    this.passwordSchema = string()
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
      };
    } catch (error: unknown) {
      const err = error as ValidationError;

      return {
        isValid: false,
        message: err.message,
      };
    }
  }

  validateEmail(email: string): ValidationResult {
    try {
      this.emailSchema.validateSync(email);

      return {
        isValid: true,
      };
    } catch (error: unknown) {
      const err = error as ValidationError;

      return {
        isValid: false,
        message: err.message,
      };
    }
  }

  validate(inputName: string, inputText: string) {
    switch (inputName) {
      case "email":
        return this.validateEmail(inputText);
      case "password":
        return this.validatePassword(inputText);
    }
  }
}
