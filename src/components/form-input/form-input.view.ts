import { ViewBuilder } from "@Interfaces/view-builder";

export default class FormInputView extends ViewBuilder {
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
      classes: ["row"],
    });
    this.inputLabel = this.createElement("label", {
      id: "login-email-label",
      classes: [`col-form-label`, "col-sm-2"],
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

  render() {
    this.inputWrapper.append(this.inputLabel, this.input, this.inputHelp);
    this.appendTo(`#${this.formName}-form`, this.inputWrapper);
  }
}
