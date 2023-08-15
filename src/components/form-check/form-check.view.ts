import { ViewBuilder } from "@Interfaces/view-builder";
import { FormCheckProps } from "./form-check.types";

export default class FormCheckView extends ViewBuilder {
  inputName: string;
  formName: string;
  passwordCheckbox: HTMLInputElement;
  checkboxWrapper: HTMLDivElement;
  passwordCheckLabel: HTMLLabelElement;

  constructor({ formName, inputName }: FormCheckProps) {
    super();
    this.formName = formName;
    this.inputName = inputName;
    this.checkboxWrapper = this.createElement("div", {
      id: "checkbox-wrapper",
      classes: ["form-switch", "form-check", "col-6"],
    });
    this.passwordCheckbox = this.createElement("input", {
      id: `${inputName}-check-input`,
      classes: ["form-check-input"],
    });
    this.passwordCheckbox.setAttribute("type", "checkbox");
    this.passwordCheckLabel = this.createElement("label", {
      id: "login-check-label",
      classes: ["form-check-label"],
      dataset: [{ for: "login-check-input" }],
    });
    this.passwordCheckLabel.textContent = "Show password";
    this.passwordCheckLabel.setAttribute("for", "login-check-input");
    this.checkboxWrapper.append(this.passwordCheckbox, this.passwordCheckLabel);
  }

  render() {
    return this.checkboxWrapper;
  }
}
