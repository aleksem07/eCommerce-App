import { ViewBuilder } from "@Interfaces/view-builder";
import { ValidationResult } from "@Utils/validator/validator.types";
import { FormControlProps } from "./form-control.types";

export default class FormControlView extends ViewBuilder {
  formName: string;
  inputName: string;
  inputWrapper: HTMLElement;
  inputLabel: HTMLLabelElement;
  input: HTMLInputElement;
  inputHelp: HTMLElement;

  constructor({
    formName,
    inputName,
    labelText,
    helpText,
    placeholderText,
    type,
    value,
    min,
    disabled = false,
    classes,
  }: FormControlProps) {
    super();
    this.formName = formName;
    this.inputName = inputName;
    this.inputWrapper = this.createElement("div", {
      id: `${formName}-${inputName}-wrapper`,
      classes: classes ? [...classes] : ["mt-2"],
    });
    this.inputLabel = this.createElement("label", {
      id: `${formName}-${inputName}-label`,
      classes: ["form-label"],
    });
    this.inputLabel.setAttribute("for", `${formName}-${inputName}-input`);
    this.inputLabel.textContent = labelText;
    this.input = this.createInput({
      formName,
      inputName,
      placeholderText,
      type,
      value,
      min,
      disabled,
    });
    this.inputHelp = this.createElement("small", {
      id: `${helpText}-help`,
      classes: ["form-text", "h6"],
    });
    this.inputHelp.textContent = helpText || "";
  }

  private createInput({
    formName,
    inputName,
    placeholderText,
    type,
    value,
    min,
    disabled = false,
  }: Partial<FormControlProps>) {
    const element = this.createElement<HTMLInputElement>("input", {
      id: `${formName}-${inputName}-input`,
      classes: ["form-control"],
    });
    element.placeholder = placeholderText || "";
    element.name = inputName || "";
    element.type = type || "text";
    element.value = value || "";
    element.disabled = disabled;

    if (min) {
      this.input.min = min;
    }

    return element;
  }

  inputListener(handler: (text: string) => void) {
    this.input.addEventListener("input", (event) => {
      event.preventDefault();
      const inputText = this.input.value;
      handler(inputText);
    });
  }

  showValidation(resultValid: ValidationResult) {
    this.inputHelp.textContent = resultValid.message || "\u00A0";

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

    return this.inputWrapper;
  }
}
