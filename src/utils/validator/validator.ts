import { date, string, StringSchema, ValidationError } from "yup";
import { ValidationSchema, ValidationResult } from "./validator.types";

export default class ValidatorUtil {
  passwordSchema: ValidationSchema;
  emailSchema: ValidationSchema;
  nameSchema: ValidationSchema;
  postalCodeSchema: ValidationSchema;
  dateOfBirthSchema: ValidationSchema;
  streetSchema: ValidationSchema;

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

    this.nameSchema = string()
      .min(1, "At least one character is required")
      .matches(/^[a-zA-Z]+$/, "Only alphabetic characters are allowed")
      .required("This field is required");

    this.postalCodeSchema = string()
      .matches(/[0-9A-Za-z -]+/, "Invalid postal code format")
      .required("Postal code is required");

    this.dateOfBirthSchema = date()
      .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100)), "Invalid date")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 13)),
        "You must be 13 years old or older"
      )
      .required("Date of birth is required");

    this.streetSchema = string()
      .min(1, "At least one character is required")
      .required("Street address is required");
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

  validateField(schema: ValidationSchema, value: string | Date): ValidationResult {
    try {
      schema.validateSync(value);

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

  validateName(name: string): ValidationResult {
    return this.validateField(this.nameSchema, name);
  }

  validatePostalCode(postalCode: string): ValidationResult {
    return this.validateField(this.postalCodeSchema, postalCode);
  }

  validateDateOfBirth(dateOfBirth: string | Date): ValidationResult {
    return this.validateField(this.dateOfBirthSchema, dateOfBirth);
  }

  validateStreet(street: string): ValidationResult {
    return this.validateField(this.streetSchema, street);
  }

  validate(inputName: string, inputText: string) {
    switch (inputName) {
      case "email":
        return this.validateEmail(inputText);
      case "password":
        return this.validatePassword(inputText);
      case "first_name":
      case "last_name":
      case "city":
        return this.validateName(inputText);
      case "postal_code":
        return this.validatePostalCode(inputText);
      case "date_of_birth":
        return this.validateDateOfBirth(inputText);
      case "street":
        return this.validateStreet(inputText);
    }
  }
}
