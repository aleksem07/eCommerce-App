import { ViewBuilder } from "@Interfaces/view-builder";
import { FormCheckProps } from "./form-check.types";

export default class FormCheckView extends ViewBuilder {
  // Properties
  inputName: string;
  formName: string;
  passwordCheckbox: HTMLInputElement;
  checkboxWrapper: HTMLDivElement;
  passwordCheckLabel: HTMLLabelElement;

  constructor({ formName, inputName }: FormCheckProps) {
    super();
    this.formName = formName;
    this.inputName = inputName;

    // Create the checkbox wrapper div element
    this.checkboxWrapper = this.createElement("div", {
      id: "checkbox-wrapper",
      classes: ["form-switch", "form-check", "col-6"],
    });

    // Create the password checkbox input element
    this.passwordCheckbox = this.createElement("input", {
      id: `${inputName}-checkbox-input`,
      classes: ["form-check-input"],
    });
    this.passwordCheckbox.setAttribute("type", "checkbox");

    // Create the password checkbox label element
    this.passwordCheckLabel = this.createElement("label", {
      id: `${inputName}-checkbox-label`,
      classes: ["form-check-label"],
      dataset: [{ for: "login-checkbox-input" }],
    });
    this.passwordCheckLabel.textContent = "Show password";
    this.passwordCheckLabel.setAttribute("for", "login-checkbox-input");

    // Append the checkbox input and label elements to the checkbox wrapper
    this.checkboxWrapper.append(this.passwordCheckbox, this.passwordCheckLabel);
  }

  /**
   * Render the form check view.
   * @returns {HTMLDivElement} The rendered form check view.
   */
  render() {
    return this.checkboxWrapper;
  }
}
