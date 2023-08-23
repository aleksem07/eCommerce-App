import { date, string, ValidationError } from "yup";
import { ValidationSchema, ValidationResult } from "./validator.types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default class ValidatorUtil {
  passwordSchema: ValidationSchema;
  emailSchema: ValidationSchema;
  nameSchema: ValidationSchema;
  postalCodeSchema: ValidationSchema;
  dateOfBirthSchema: ValidationSchema;
  streetSchema: ValidationSchema;
  countrySchema: ValidationSchema;
  validCountries = ["US"];

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
      .min(1, "At least one character is required in the name")
      .matches(/^[a-zA-Z\s]+$/, "Only Latin letters and spaces are allowed in the name.")
      .required("This field is required");

    this.postalCodeSchema = this.postalCodeSchemaCheck();
    this.dateOfBirthSchema = this.dateOfBirthSchemaCheck();

    this.countrySchema = string()
      .transform((value) => value.toUpperCase())
      .oneOf(this.validCountries, "Please select a valid country")
      .required("Country is required");

    this.streetSchema = string()
      .matches(/^[A-Za-z0-9\s\-.,]+$/, "Invalid characters in street address")
      .min(1, "At least one character is required in the street address")
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
    const now = dayjs();
    const minDate = dayjs("1900-01-01").toISOString();
    const maxDate = now.subtract(13, "year").toISOString();

    return date()
      .max(maxDate, "You must be 13 years old or older")
      .min(minDate, "Date must not be earlier than January 1, 1900")
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
      case "city-billing":
        return this.validateName(inputText);
      case "country":
      case "country-billing":
        return this.validateCountry(inputText);
      case "postal-code":
      case "postal-code-billing":
        return this.validatePostalCode(inputText);
      case "date-of-birth":
        return this.validateDateOfBirth(inputText);
      case "street":
      case "street-billing":
        return this.validateStreet(inputText);
    }
  }
}
