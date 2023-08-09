import { ViewBuilder } from "@Interfaces/view-builder";
export default class LoginFormView extends ViewBuilder {
  form: HTMLElement;
  container: HTMLElement;
  emailWrapper: HTMLElement;
  emailLabel: HTMLElement;
  emailInput: HTMLElement;
  emailHelp: HTMLElement;
  passwordWrapper: HTMLElement;
  passwordLabel: HTMLElement;
  passwordInput: HTMLElement;
  passwordHelp: HTMLElement;
  loginSubmitButton: HTMLElement;
  constructor() {
    super();
    this.form = this.createElement("form", { id: "login-form" });
    this.container = this.createElement("div", { id: "login-container", classes: ["container"] });
    this.emailWrapper = this.createElement("div", { id: "login_email-wrapper", classes: ["mb-3"] });
    this.emailLabel = this.createElement("label", {
      id: "login_email-label",
      classes: ["form-label", "mb-1"],
      dataset: [{ for: "loginLabelEmail" }],
    });
    this.emailInput = this.createElement("input", {
      id: "login_email-input",
      classes: ["form-control", "mb-3"],
      dataset: [{ for: "loginInputEmail" }],
    });
    this.emailHelp = this.createElement("small", {
      id: "email-help",
      classes: ["form-text"],
    });
    this.passwordWrapper = this.createElement("div", { id: "password-wrapper", classes: ["mb-3"] });
    this.passwordLabel = this.createElement("label", {
      id: "password-label",
      classes: ["form-label", "mb-1"],
      dataset: [{ for: "password-input" }],
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
  }
  private fillEmailWprapper() {
    this.emailLabel.textContent = "Email address";
    this.emailHelp.textContent = "We'll never share your email with anyone else.";
    this.container.append(this.emailWrapper);
    this.emailWrapper.append(this.emailLabel, this.emailInput, this.emailHelp);
  }
  private fillPaswordWrapper() {
    this.passwordLabel.textContent = "Password";
    this.passwordHelp.textContent = "Must be at least 8 characters";
    this.container.append(this.passwordWrapper);
    this.passwordWrapper.append(this.passwordLabel, this.passwordInput, this.passwordHelp);
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

  render() {
    this.fillEmailWprapper();
    this.fillPaswordWrapper();
    this.form.append(this.container);
    this.container.append(this.loginSubmitButton);
    this.loginSubmitButton.textContent = "Submit";
    this.appendTo("#login-page", this.form);
  }
}
