import { ViewBuilder } from "@Interfaces/view-builder";

// import Tooltip from "@Components/tooltip/tooltip";
// import { AuthResult } from "@Services/auth/auth.types";

export default class LoginFormView extends ViewBuilder {
  private form: HTMLFormElement;
  private container: HTMLDivElement;
  private header: HTMLHeadingElement;
  private submitButton: HTMLButtonElement;

  constructor() {
    super();
    this.form = this.createElement("form", {
      id: `login-form`,
      classes: ["form-group", "col-6", "justify-content-between", "flex-column"],
    });
    this.container = this.createElement("div", {
      id: `login-container`,
      classes: ["container", "justify-content-center", "row"],
    });
    this.header = this.createElement("h1", {
      id: `login-header`,
      classes: ["text-center"],
    });
    this.header.textContent = `Login`;
    this.submitButton = this.createElement("button", {
      id: `login-submit-button`,
      classes: ["btn", "btn-primary", "col-12"],
    });
    this.submitButton.setAttribute("type", "submit");
    this.submitButton.textContent = "Submit";
  }

  render() {
    this.form.append(this.submitButton);
    this.container.append(this.header, this.form);
    this.appendTo("#login-page", this.container);
  }
}
