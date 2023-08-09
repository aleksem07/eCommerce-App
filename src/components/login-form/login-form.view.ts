import { ViewBuilder } from "@Interfaces/view-builder";
export default class LoginFormView extends ViewBuilder {
  form: HTMLElement;
  container: HTMLElement;
  // emailWrapper: HTMLElement;
  // emailLabel: HTMLElement;
  emailInput: HTMLElement;
  emailHelp: HTMLElement;
  // passwordWrapper: HTMLElement;
  // passwordLabel: HTMLElement;
  passwordInput: HTMLElement;
  passwordHelp: HTMLElement;
  loginSubmitButton: HTMLElement;
  passwordCheckbox: HTMLElement;
  passwordCheckLabel: HTMLElement;
  constructor() {
    super();
    this.form = this.createElement("form", { id: "login-form" });
    this.container = this.createElement("div", { id: "login-container", classes: ["container"] });
    this.emailInput = this.createElement("input", {
      id: "login_email-input",
      classes: ["form-control", "mb-3"],
      dataset: [{ for: "loginInputEmail" }],
    });
    this.emailHelp = this.createElement("small", {
      id: "email-help",
      classes: ["form-text"],
    });
    this.passwordInput = this.createElement("input", {
      id: "password-input",
      classes: ["form-control", "mb-3"],
      dataset: [{ type: "password" }],
    });
    this.passwordHelp = this.createElement("small", {
      id: "password-help",
      classes: ["form-text"],
    });
    this.loginSubmitButton = this.createElement("button", {
      id: "login_submit-button",
      classes: ["btn", "btn-primary", "mb-3"],
      dataset: [{ type: "submit" }],
    });
    this.passwordCheckbox = this.createElement("input", {
      id: "login_check-input",
      classes: ["form-check-input"],
      dataset: [{ type: "checkbox" }],
    });
    this.passwordCheckLabel = this.createElement("label", {
      id: "login-check-label",
      classes: ["form-check-label", "mb-1"],
      dataset: [{ for: "login_check-input" }],
    });
  }
  private createEmailWprapper() {
    const emailWrapper = this.createElement("div", {
      id: "login_email-wrapper",
      classes: ["mb-3"],
    });
    const emailLabel = this.createElement("label", {
      id: "login_email-label",
      classes: ["form-label", "mb-1"],
      dataset: [{ for: "login_email-input" }],
    });
    emailLabel.textContent = "Email address";
    this.emailHelp.textContent = "We'll never share your email with anyone else.";
    this.container.append(emailWrapper);
    emailWrapper.append(emailLabel, this.emailInput, this.emailHelp);
  }
  private createPaswordWrapper() {
    const passwordWrapper = this.createElement("div", {
      id: "password-wrapper",
      classes: ["mb-3"],
    });
    const passwordLabel = this.createElement("label", {
      id: "password-label",
      classes: ["form-label", "mb-1"],
      dataset: [{ for: "password-input" }],
    });
    (this.passwordInput as HTMLInputElement).type = "password";
    passwordLabel.textContent = "Password";
    this.passwordHelp.textContent = "Must be at least 8 characters";
    this.container.append(passwordWrapper);
    passwordWrapper.append(passwordLabel, this.passwordInput, this.passwordHelp);
  }
  private createCheckbox() {
    const checkboxWrapper = this.createElement("div", {
      id: "checkbox-wrapper",
      classes: ["mb-3", "form-check"],
    });
    this.passwordCheckLabel.textContent = "Show password";
    (this.passwordCheckbox as HTMLInputElement).type = "checkbox";
    this.container.append(checkboxWrapper);
    checkboxWrapper.append(this.passwordCheckbox, this.passwordCheckLabel);
  }
  submitFormListener(handler: (event: SubmitEvent) => void) {
    this.form.addEventListener("submit", (event) => {
      handler(event);
    });
  }
  inputEmailListener(handler: (event: InputEvent) => void) {
    this.emailInput.addEventListener("input", (event) => {
      handler(event as InputEvent);
    });
  }
  inputPasswordListener(handler: (event: InputEvent) => void) {
    this.passwordInput.addEventListener("input", (event) => {
      handler(event as InputEvent);
    });
  }
  checkboxListener(handler: (event: InputEvent) => void) {
    (this.passwordCheckbox as HTMLInputElement).addEventListener("change", (event) => {
      handler(event as InputEvent);
    });
  }
  render() {
    this.createEmailWprapper();
    this.createPaswordWrapper();
    this.form.append(this.container);
    this.createCheckbox();
    this.container.append(this.loginSubmitButton);
    this.loginSubmitButton.textContent = "Submit";
    this.appendTo("#login-page", this.form);
  }
}
