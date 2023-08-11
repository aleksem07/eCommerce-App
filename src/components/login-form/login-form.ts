import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";

export default class LoginFormComponent {
  view: LoginFormView;
  validator: ValidatorUtil;

  constructor() {
    this.view = new LoginFormView();
    this.view.inputEmailListener(this.inputEmailHandler.bind(this));
    this.view.inputPasswordListener(this.inputPasswordHandler.bind(this));
    this.view.checkboxListener(this.checkboxHandler.bind(this));
    this.validator = new ValidatorUtil();
  }

  async inputEmailHandler(email: string) {
    const emailValid = await this.validator.validateEmail(email);
    this.view.emailHelp.textContent = emailValid.message;

    if (emailValid.isValid) {
      this.view.emailInput.classList.remove("is-invalid");
      this.view.emailInput.classList.add("is-valid");
      this.view.emailHelp.classList.remove("invalid-feedback");
    } else {
      this.view.emailInput.classList.remove("is-valid");
      this.view.emailInput.classList.add("is-invalid");
      this.view.emailHelp.classList.add("invalid-feedback");
    }
  }

  async inputPasswordHandler(password: string) {
    const passwordValid = await this.validator.validatePassword(password);
    this.view.passwordHelp.textContent = passwordValid.message;

    if (passwordValid.isValid) {
      this.view.passwordInput.classList.remove("is-invalid");
      this.view.passwordInput.classList.add("is-valid");
      this.view.passwordHelp.classList.remove("invalid-feedback");
    } else {
      this.view.passwordInput.classList.remove("is-valid");
      this.view.passwordInput.classList.add("is-invalid");
      this.view.passwordHelp.classList.add("invalid-feedback");
    }
  }

  async checkboxHandler(status: boolean, input: HTMLInputElement) {
    if (status) {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  init() {
    this.view.render();
  }
}
