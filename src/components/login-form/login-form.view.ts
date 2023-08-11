import { ViewBuilder } from "@Interfaces/view-builder";
import { ValidationResult } from "@Utils/validator/validator.types";

export default class LoginFormView extends ViewBuilder {
  private form: HTMLFormElement;
  private container: HTMLDivElement;
  private emailInput: HTMLInputElement;
  private emailHelp: HTMLElement;
  private passwordInput: HTMLInputElement;
  private passwordHelp: HTMLElement;
  private loginSubmitButton: HTMLButtonElement;
  private passwordCheckbox: HTMLInputElement;

  constructor() {
    super();
    this.form = this.createElement("form", { id: "login-form" });
    this.container = this.createElement("div", { id: "login-container", classes: ["container"] });
    this.emailInput = this.createElement("input", {
      id: "login_email-input",
      classes: ["form-control"],
    });
    this.emailInput.setAttribute("for", "loginInputEmail");
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
      id: "login_submit-button",
      classes: ["btn", "btn-primary"],
    });
    this.loginSubmitButton.setAttribute("type", "submit");
    this.passwordCheckbox = this.createElement("input", {
      id: "login_check-input",
      classes: ["form-check-input"],
    });
    this.passwordCheckbox.setAttribute("type", "checkbox");
    this.passwordCheckbox.type = "checkbox";
  }

  private createEmailWprapper() {
    const emailWrapper = this.createElement("div", {
      id: "login_email-wrapper",
      classes: ["row"],
    });
    const emailLabel = this.createElement("label", {
      id: "login_email-label",
      classes: ["col-form-label", "col-sm-2"],
    });
    emailLabel.setAttribute("for", "login_email-input");
    emailLabel.textContent = "Email address";
    this.emailHelp.textContent = "We'll never share your email with anyone else.";
    this.form.append(emailWrapper);
    emailWrapper.append(emailLabel, this.emailInput, this.emailHelp);
  }

  private createPaswordWrapper() {
    const passwordWrapper = this.createElement("div", {
      id: "password-wrapper",
      classes: ["row", "mb-3"],
    });
    const passwordLabel = this.createElement("label", {
      id: "password-label",
      classes: ["col-form-label", "col-sm-2"],
    });
    passwordLabel.setAttribute("for", "lpassword-input");
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
      dataset: [{ for: "login_check-input" }],
    });
    passwordCheckLabel.textContent = "Show password";
    passwordCheckLabel.setAttribute("for", "login_check-input");
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

  handleInputValidationResult(inputName: string, resultValid: ValidationResult) {
    if (inputName === "email") {
      this.emailHelp.textContent = resultValid.message;

      if (resultValid.isValid) {
        this.emailInput.classList.remove("is-invalid");
        this.emailInput.classList.add("is-valid");
        this.emailHelp.classList.remove("invalid-feedback");
      } else {
        this.emailInput.classList.remove("is-valid");
        this.emailInput.classList.add("is-invalid");
        this.emailHelp.classList.add("invalid-feedback");
      }
    }

    if (inputName === "password") {
      this.passwordHelp.textContent = resultValid.message;

      if (resultValid.isValid) {
        this.passwordInput.classList.remove("is-invalid");
        this.passwordInput.classList.add("is-valid");
        this.passwordHelp.classList.remove("invalid-feedback");
      } else {
        this.passwordInput.classList.remove("is-valid");
        this.passwordInput.classList.add("is-invalid");
        this.passwordHelp.classList.add("invalid-feedback");
      }
    }
  }

  handleChecboxResult(status: boolean) {
    if (status) {
      this.passwordInput.type = "text";
    } else {
      this.passwordInput.type = "password";
    }
  }

  render() {
    this.createEmailWprapper();
    this.createPaswordWrapper();
    this.container.append(this.form);
    this.createCheckbox();
    this.form.append(this.loginSubmitButton);
    this.loginSubmitButton.textContent = "Submit";
    this.appendTo("#login-page", this.container);
  }
}
