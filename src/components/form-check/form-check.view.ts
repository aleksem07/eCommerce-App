import { ViewBuilder } from "@Interfaces/view-builder";
import { FormCheckProps } from "./form-check.types";

export default class FormCheckView extends ViewBuilder {
  labelText: string;
  inputName: string;
  formName: string;
  checkbox: HTMLInputElement;
  checkboxWrapper: HTMLDivElement;
  checkboxLabel: HTMLLabelElement;

  constructor({ labelText, formName, inputName, checked = false }: FormCheckProps) {
    super();
    this.labelText = labelText;
    this.formName = formName;
    this.inputName = inputName;

    this.checkboxWrapper = this.createElement("div", {
      id: "checkbox-wrapper",
      classes: ["form-switch", "form-check", "pt-2"],
    });

    this.checkbox = this.createElement("input", {
      id: `${inputName}-checkbox-input`,
      classes: ["form-check-input"],
    });
    this.checkbox.setAttribute("type", "checkbox");
    this.checkbox.checked = checked;

    this.checkboxLabel = this.createElement("label", {
      id: `${inputName}-checkbox-label`,
      classes: ["form-check-label"],
    });
    this.checkboxLabel.textContent = labelText;
    this.checkboxLabel.setAttribute("for", `${inputName}-checkbox-input`);

    this.checkboxWrapper.append(this.checkbox, this.checkboxLabel);
  }

  render() {
    return this.checkboxWrapper;
  }
}
