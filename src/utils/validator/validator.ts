import { date, string, ValidationError } from "yup";
import { ValidationSchema, ValidationResult } from "./validator.types";

export default class ValidatorUtil {
  passwordSchema: ValidationSchema;
  emailSchema: ValidationSchema;
  nameSchema: ValidationSchema;
  postalCodeSchema: ValidationSchema;
  dateOfBirthSchema: ValidationSchema;
  streetSchema: ValidationSchema;
  countrySchema: ValidationSchema;
  validCountries = ["CA", "US", "GB", "USA", "GBR", "CANADA", "THE UNITED STATES OF AMERICA"];

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
      .transform((value) => value.trim().toUpperCase())
      .min(1, "At least one character is required")
      .matches(/^[a-zA-Z\s]+$/, "Only alphabetic characters and spaces are allowed")
      .required("This field is required");

    this.postalCodeSchema = this.postalCodeSchemaCheck();
    this.dateOfBirthSchema = this.dateOfBirthSchemaCheck();

    this.countrySchema = string()
      .transform((value) => value.toUpperCase())
      .oneOf(this.validCountries, "Please select a valid country")
      .required("Country is required");

    this.streetSchema = string()
      .matches(/^[A-Za-z0-9\s\-.,]+$/, "Invalid characters in street address")
      .min(1, "At least one character is required")
      .required("Street address is required");
  }

  postalCodeSchemaCheck(): ValidationSchema {
    return string()
      .matches(
        /^(?:\d{5}(-\d{4})?|[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d)$/,
        "Invalid postal code(12345 or 12345-6789 For the U.S., A1B 2C3 or A1B2C3 for Canada)"
      )
      .required("Postal code is required");
  }

  dateOfBirthSchemaCheck(): ValidationSchema {
    return string()
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, "You must be older then 13 years old")
      .test("date-of-birth", "Date of birth is not valid", (value) => {
        if (value) {
          const dateParts = value.split("/");
          const dateValue = new Date(+dateParts[2], +dateParts[0] - 1, +dateParts[1]);
          const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 100));
          const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 13));

          return dateValue >= minDate && dateValue <= maxDate;
        }
      })
      .required("Date of birth is required");
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

  validateCountry(country: string): ValidationResult {
    return this.validateField(this.countrySchema, country);
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
      case "first-name":
      case "last-name":
      case "city":
        return this.validateName(inputText);
      case "country":
        return this.validateCountry(inputText);
      case "postal-code":
        return this.validatePostalCode(inputText);
      case "date-of-birth":
        return this.validateDateOfBirth(inputText);
      case "street":
        return this.validateStreet(inputText);
    }
  }
}
