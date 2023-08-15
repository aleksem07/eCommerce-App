import { ViewBuilder } from "@Interfaces/view-builder";
import { ValidationResult } from "@Utils/validator/validator.types";

export default class FormControlView extends ViewBuilder {
  formName: string;
  inputName: string;
  inputWrapper: HTMLElement;
  inputLabel: HTMLLabelElement;
  input: HTMLInputElement;
  inputHelp: HTMLElement;

  constructor(formName: string, inputName: string, labelText: string, helpText: string) {
    super();

    this.formName = formName;
    this.inputName = inputName;
    this.inputWrapper = this.createElement("div", {
      id: `${formName}-${inputName}-wrapper`,
      classes: ["form-floating"],
    });
    this.inputLabel = this.createElement("label", {
      id: "login-email-label",
      classes: ["control-label"],
    });
    this.inputLabel.setAttribute("for", `${formName}-${inputName}-input`);
    this.inputLabel.textContent = labelText;
    this.input = this.createElement("input", {
      id: `${formName}-${inputName}-input`,
      classes: ["form-control"],
    });
    this.inputHelp = this.createElement("small", {
      id: `${helpText}-help`,
      classes: ["form-text"],
    });
    this.inputHelp.textContent = helpText;
  }

  inputListener(handler: (text: string) => void) {
    this.input.addEventListener("input", (event) => {
      event.preventDefault();
      const inputText = this.input.value;
      handler(inputText);
    });
  }

  showValidation(resultValid: ValidationResult) {
    this.inputHelp.textContent = resultValid.message || null;

    if (resultValid.isValid) {
      this.input.classList.remove("is-invalid");
      this.input.classList.add("is-valid");
      this.inputHelp.classList.remove("invalid-feedback");
    } else {
      this.input.classList.remove("is-valid");
      this.input.classList.add("is-invalid");
      this.inputHelp.classList.add("invalid-feedback");
    }
  }

  render() {
    this.inputWrapper.append(this.inputLabel, this.input, this.inputHelp);
    this.insertBefore(
      `#${this.formName}-form`,
      this.inputWrapper,
      `#${this.formName}-submit-button`
    );
  }
}
