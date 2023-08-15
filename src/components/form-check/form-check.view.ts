import { ViewBuilder } from "@Interfaces/view-builder";

export default class FormCheckView extends ViewBuilder {
  inputName: string;
  formName: string;
  passwordCheckbox: HTMLInputElement;
  checkboxWrapper: HTMLDivElement;
  passwordCheckLabel: HTMLLabelElement;

  constructor(formName: string, inputName: string) {
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
    const input = this.getElement(`#${this.formName}-${this.inputName}-input`);

    if (input) {
      (input as HTMLInputElement).type = "password";
    }

    return this.checkboxWrapper;
  }
}
