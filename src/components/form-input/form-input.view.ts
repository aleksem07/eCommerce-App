import { ViewBuilder } from "@Interfaces/view-builder";
import { ValidationResult } from "@Utils/validator/validator.types";

export default class FormInputView extends ViewBuilder {
  formName: string;
  inputName: string;
  inputWrapper: HTMLElement;
  inputLabel: HTMLLabelElement;
  input: HTMLInputElement;
  inputHelp: HTMLElement;
  checkbox = false;
  passwordCheckbox: HTMLInputElement;

  constructor(
    formName: string,
    inputName: string,
    labelText: string,
    helpText: string,
    checkbox: boolean
  ) {
    super();
    this.checkbox = checkbox;
    this.formName = formName;
    this.inputName = inputName;
    this.inputWrapper = this.createElement("div", {
      id: `${formName}-${inputName}-wrapper`,
      classes: ["form-group", "col-12"],
    });
    this.inputLabel = this.createElement("label", {
      id: "login-email-label",
      classes: ["col-sm-2", "control-label"],
    });
    this.inputLabel.setAttribute("for", `${formName}-${inputName}-input`);
    this.inputLabel.textContent = labelText;
    this.input = this.createElement("input", {
      id: `${formName}-${inputName}-input`,
      classes: ["form-control", "input-xs"],
    });
    this.inputHelp = this.createElement("small", {
      id: `${helpText}-help`,
      classes: ["form-text"],
    });
    this.inputHelp.textContent = helpText;
    this.passwordCheckbox = this.createElement("input", {
      id: `${inputName}-check-input`,
      classes: ["form-check-input"],
    });
    this.passwordCheckbox.setAttribute("type", "checkbox");
  }

  inputListener(handler: (text: string) => void) {
    this.input.addEventListener("input", (event) => {
      event.preventDefault();
      const inputText = this.input.value;
      handler(inputText);
    });
  }

  handleInputValidationResult(resultValid: ValidationResult) {
    const help = this.inputHelp;
    const input = this.input;

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

  private createCheckbox() {
    this.input.type = "password";
    const checkboxWrapper: HTMLDivElement = this.createElement("div", {
      id: "checkbox-wrapper",
      classes: ["form-switch", "form-check", "col-6"],
    });
    const passwordCheckLabel: HTMLLabelElement = this.createElement("label", {
      id: "login-check-label",
      classes: ["form-check-label"],
      dataset: [{ for: "login-check-input" }],
    });
    passwordCheckLabel.textContent = "Show password";
    passwordCheckLabel.setAttribute("for", "login-check-input");
    checkboxWrapper.append(this.passwordCheckbox, passwordCheckLabel);
    this.insertBefore(`#${this.formName}-form`, checkboxWrapper, `#${this.formName}-submit-button`);
  }

  checkboxListener(handler: (status: boolean) => void) {
    this.passwordCheckbox.addEventListener("change", (event) => {
      event.preventDefault();
      handler(this.passwordCheckbox.checked);
    });
  }

  handleChecboxResult(status: boolean) {
    const passwordInput = this.getElement("#login-password-input");

    if (status) {
      (passwordInput as HTMLInputElement).type = "text";
    } else {
      (passwordInput as HTMLInputElement).type = "password";
    }
  }

  render() {
    this.inputWrapper.append(this.inputLabel, this.input, this.inputHelp);
    this.appendTo(`#${this.formName}-form`, this.inputWrapper);
    this.insertBefore(
      `#${this.formName}-form`,
      this.inputWrapper,
      `#${this.formName}-submit-button`
    );

    if (this.checkbox) {
      this.createCheckbox();
    }
  }
}
