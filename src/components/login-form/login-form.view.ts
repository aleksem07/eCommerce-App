import { ViewBuilder } from "@Interfaces/view-builder";
import { ValidationResult } from "@Utils/validator/validator.types";
import Tooltip from "@Components/tooltip/tooltip";
import { AuthResult } from "@Services/auth/auth.types";

export default class LoginFormView extends ViewBuilder {
  private form: HTMLFormElement;
  private container: HTMLDivElement;
  private emailInput: HTMLInputElement;
  private emailHelp: HTMLElement;
  private passwordInput: HTMLInputElement;
  private passwordHelp: HTMLElement;
  private loginSubmitButton: HTMLButtonElement;
  private passwordCheckbox: HTMLInputElement;
  private tooltip: Tooltip;

  constructor() {
    super();
    this.tooltip = new Tooltip();
    this.form = this.createElement("form", { id: "login-form" });
    this.container = this.createElement("div", { id: "login-container", classes: ["container"] });
    this.emailInput = this.createElement("input", {
      id: "login-email-input",
      classes: ["form-control"],
    });
    this.emailInput.setAttribute("for", "login-Input-Email");
    this.emailHelp = this.createElement("small", {
      id: "email-help",
      classes: ["form-text"],
    });
    this.passwordInput = this.createElement("input", {
      id: "password-input",
      classes: ["form-control"],
    });
    this.passwordInput.type = "password";
    this.passwordHelp = this.createElement("small", {
      id: "password-help",
      classes: ["form-text"],
    });
    this.passwordHelp.textContent = "Must be at least 8 characters";
    this.loginSubmitButton = this.createElement("button", {
      id: "login-submit-button",
      classes: ["btn", "btn-primary"],
    });
    this.loginSubmitButton.setAttribute("type", "submit");
    this.passwordCheckbox = this.createElement("input", {
      id: "logincheck-input",
      classes: ["form-check-input"],
    });
    this.passwordCheckbox.setAttribute("type", "checkbox");
    this.passwordCheckbox.type = "checkbox";
  }

  private createEmailWrapper() {
    const emailWrapper = this.createElement("div", {
      id: "login-email-wrapper",
      classes: ["row"],
    });
    const emailLabel = this.createElement("label", {
      id: "login-email-label",
      classes: ["col-form-label", "col-sm-2"],
    });
    emailLabel.setAttribute("for", "login-email-input");
    emailLabel.textContent = "Email address";
    this.emailHelp.textContent = "We'll never share your email with anyone else.";
    this.form.append(emailWrapper);
    emailWrapper.append(emailLabel, this.emailInput, this.emailHelp);
  }

  private createPasswordWrapper() {
    const passwordWrapper = this.createElement("div", {
      id: "password-wrapper",
      classes: ["row", "mb-3"],
    });
    const passwordLabel = this.createElement("label", {
      id: "password-label",
      classes: ["col-form-label", "col-sm-2"],
    });
    passwordLabel.setAttribute("for", "password-input");
    passwordLabel.textContent = "Password";
    this.form.append(passwordWrapper);
    passwordWrapper.append(passwordLabel, this.passwordInput, this.passwordHelp);
  }

  private createCheckbox() {
    const checkboxWrapper = this.createElement("div", {
      id: "checkbox-wrapper",
      classes: ["mb-3", "form-check"],
    });
    const passwordCheckLabel = this.createElement("label", {
      id: "login-check-label",
      classes: ["form-check-label"],
      dataset: [{ for: "login-check-input" }],
    });
    passwordCheckLabel.textContent = "Show password";
    passwordCheckLabel.setAttribute("for", "login-check-input");
    this.form.append(checkboxWrapper);
    checkboxWrapper.append(this.passwordCheckbox, passwordCheckLabel);
  }

  inputEmailListener(handler: (email: string) => void) {
    this.emailInput.addEventListener("input", (event) => {
      event.preventDefault();
      const email = this.emailInput.value;
      handler(email);
    });
  }

  inputPasswordListener(handler: (password: string) => void) {
    this.passwordInput.addEventListener("input", (event) => {
      event.preventDefault();
      const password = this.passwordInput.value;
      handler(password);
    });
  }

  checkboxListener(handler: (status: boolean) => void) {
    this.passwordCheckbox.addEventListener("change", (event) => {
      event.preventDefault();
      handler(this.passwordCheckbox.checked);
    });
  }

  submitFormListener(handler: (email: string, password: string) => void) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = this.emailInput.value;
      const password = this.passwordInput.value;
      handler(email, password);
    });
  }

  handleInputValidationResult(inputName: string, resultValid: ValidationResult) {
    let help;
    let input;

    if (inputName === "email") {
      help = this.emailHelp;
      input = this.emailInput;
    } else if (inputName === "password") {
      help = this.passwordHelp;
      input = this.passwordInput;
    }

    if (input && help) {
      help.textContent = resultValid.message || null;

      if (resultValid.isValid) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        help.classList.remove("invalid-feedback");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        help.classList.add("invalid-feedback");
      }
    }
  }

  handleCheckboxResult(status: boolean) {
    if (status) {
      this.passwordInput.type = "text";
    } else {
      this.passwordInput.type = "password";
    }
  }

  showNotification(result: AuthResult, message: string) {
    this.tooltip.init(this.loginSubmitButton, result, message);
  }

  render() {
    this.createEmailWrapper();
    this.createPasswordWrapper();
    this.container.append(this.form);
    this.createCheckbox();
    this.form.append(this.loginSubmitButton);
    this.loginSubmitButton.textContent = "Submit";
    this.appendTo("#login-page", this.container);
  }
}
