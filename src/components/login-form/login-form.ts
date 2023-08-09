import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";
export default class LoginFormComponent {
  private view: LoginFormView;
  private validator: ValidatorUtil;
  constructor() {
    this.view = new LoginFormView();
    this.view.submitFormListener(this.submitFormListener.bind(this));
    this.view.inputEmailListener(this.inputEmailListener.bind(this));
    this.view.inputPasswordListener(this.inputPasswordListener.bind(this));
    this.view.checkboxListener(this.checkboxListener.bind(this));
    this.validator = new ValidatorUtil();
  }
  async submitFormListener(event: SubmitEvent) {
    event.preventDefault();
    const email = (this.view.emailInput as HTMLInputElement).value;
    const password = (this.view.passwordInput as HTMLInputElement).value;
    const emailChecked = await this.validator.validateEmail(email);
    const passwordChecked = await this.validator.validatePassword(password);
    if (emailChecked.result && passwordChecked.result) {
      alert("Login successful");
    } else {
      alert("Login failed");
    }
    // this.view.emailHelp.textContent = emailChecked.message;
    // this.view.passwordHelp.textContent = passwordChecked.message;
  }
  async inputEmailListener(event: InputEvent) {
    event.preventDefault();
    const email = (this.view.emailInput as HTMLInputElement).value;
    const emailChecked = await this.validator.validateEmail(email);
    this.view.emailHelp.textContent = emailChecked.message;
  }
  async inputPasswordListener(event: InputEvent) {
    event.preventDefault();
    const password = (this.view.passwordInput as HTMLInputElement).value;
    const passwordChecked = await this.validator.validatePassword(password);
    this.view.passwordHelp.textContent = passwordChecked.message;
  }
  async checkboxListener() {
    if ((this.view.passwordCheckbox as HTMLInputElement).checked) {
      (this.view.passwordInput as HTMLInputElement).type = "text";
    } else {
      (this.view.passwordInput as HTMLInputElement).type = "password";
    }
    // eslint-disable-next-line no-console
    console.log((this.view.passwordCheckbox as HTMLInputElement).checked);
  }
  // eslint-disable-next-line no-console
  // console.log(emailChecked);
  // eslint-disable-next-line no-console
  // console.log(passwordChecked);
  // const emailInput = this.view.getElement("#login_email-input") as ;
  // console.log(();
  // eslint-disable-next-line no-console
  // console.log((this.view.passwordInput as HTMLInputElement).value);
  // console.log("submitFormListener");

  init() {
    this.view.render();
  }
}
