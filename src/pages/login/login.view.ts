import { ViewBuilder } from "@Interfaces/view-builder";

export default class LoginView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("section", { id: "login-page" });
    // this.element.textContent = "LOGIN PAGE";
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
