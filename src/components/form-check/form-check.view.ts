import { ViewBuilder } from "@Interfaces/view-builder";
import { FormCheckProps } from "./form-check.types";

export default class FormCheckView extends ViewBuilder {
  inputName: string;
  formName: string;
  checkbox: HTMLInputElement;
  checkboxWrapper: HTMLDivElement;
  checkboxLabel: HTMLLabelElement;

  constructor({ formName, inputName }: FormCheckProps) {
    super();
    this.formName = formName;
    this.inputName = inputName;

    this.checkboxWrapper = this.createElement("div", {
      id: "checkbox-wrapper",
      classes: ["form-switch", "form-check", "col-6"],
    });

    this.checkbox = this.createElement("input", {
      id: `${inputName}-checkbox-input`,
      classes: ["form-check-input"],
    });
    this.checkbox.setAttribute("type", "checkbox");

    this.checkboxLabel = this.createElement("label", {
      id: `${inputName}-checkbox-label`,
      classes: ["form-check-label"],
    });
    this.checkboxLabel.textContent = "Show password";
    this.checkboxLabel.setAttribute("for", `${inputName}-checkbox-input`);

    this.checkboxWrapper.append(this.checkbox, this.checkboxLabel);
  }

  render() {
    return this.checkboxWrapper;
  }
}
