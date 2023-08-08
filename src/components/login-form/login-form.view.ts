import { ViewBuilder } from "@Interfaces/view-builder";

export default class LoginFormView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", { id: "login-form" });
    this.element.textContent = "LOGIN FORM";
  }

  render() {
    this.appendTo("#login-page", this.element);
  }
}
