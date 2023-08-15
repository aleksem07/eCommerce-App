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

  constructor({ formName, inputName, labelText, helpText }: FormControlProps) {
    super();

    // Initialize formName and inputName from constructor arguments
    this.formName = formName;

    // Create inputWrapper element
    this.inputName = inputName;

    this.inputWrapper = this.createElement("div", {
      id: `${formName}-${inputName}-wrapper`,
    });

    // Create inputLabel element
    this.inputLabel = this.createElement("label", {
      id: "login-email-label",
      classes: ["form-label"],
    });
    this.inputLabel.setAttribute("for", `${formName}-${inputName}-input`);
    this.inputLabel.textContent = labelText;

    // Create input element
    this.input = this.createElement("input", {
      id: `${formName}-${inputName}-input`,
      classes: ["form-control"],
    });

    // Create inputHelp element
    this.inputHelp = this.createElement("small", {
      id: `${helpText}-help`,
      classes: ["form-text"],
    });
    this.inputHelp.textContent = helpText;
  }

  /**
   * Add an event listener to the input element to handle input events
   * @param handler - The event handler function that takes a string parameter
   */
  inputListener(handler: (text: string) => void) {
    this.input.addEventListener("input", (event) => {
      event.preventDefault();
      const inputText = this.input.value;
      handler(inputText);
    });
  }

  /**
   * Show validation result by updating the inputHelp element and applying appropriate CSS classes
   * @param resultValid - The validation result object
   */
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

  /**
   * Render the form control by appending child elements to the inputWrapper element
   * @returns The inputWrapper element
   */
  render() {
    this.inputWrapper.append(this.inputLabel, this.input, this.inputHelp);

    return this.inputWrapper;
  }
}
