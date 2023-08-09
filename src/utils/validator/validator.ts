import * as yup from "../../../node_modules/yup/index";

export default class ValidatorUtil {
  emailSchema: yup.Schema<string>;
  passwordSchema: yup.Schema<string>;

  constructor() {
    this.emailSchema = yup.string().email().required();
    this.passwordSchema = yup.string().min(8).required();
  }

  validateEmail(email: string): boolean {
    try {
      this.emailSchema.validateSync(email);
      return true;
    } catch (error) {
      return false;
    }
  }

  validatePassword(password: string): boolean {
    try {
      this.passwordSchema.validateSync(password);
      return true;
    } catch (error) {
      return false;
    }
  }
}
