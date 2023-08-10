import * as yup from "../../../node_modules/yup/index";

export default class ValidatorUtil {
  passwordSchema: yup.ObjectSchema<
    { password: string },
    yup.AnyObject,
    { password: undefined },
    ""
  >;
  emailSchema: yup.ObjectSchema<{ email: string }, yup.AnyObject, { email: undefined }, "">;

  constructor() {
    this.emailSchema = yup.object().shape({
      email: yup
        .string()
        .trim()
        .email("Invalid email address.(example@gmail.com)")
        .required("Email is required"),
    });
    this.passwordSchema = yup.object().shape({
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one digit")
        .matches(/^[^\s]+$/, "Password must not contain leading or trailing whitespace")
        .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
        .required("Password is required"),
    });
  }
  validateEmail(email: string) {
    const [emailname, domain] = email.split("@");
    const emailRegex = /^\S+@\S+\.\S+$/;
    const invalidAnswer = { result: false, message: "" };
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
      result: true,
      message: "e-mail is valid",
    };
  }

  validatePassword(password: string) {
    try {
      this.passwordSchema.validateSync({ password });
      return {
        result: true,
        message: "Password is valid",
      };
    } catch (error) {
      return {
        result: false,
        message: (error as Error).message,
      };
    }
  }
}
