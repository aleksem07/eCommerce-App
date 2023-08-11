import { ViewBuilder } from "@Interfaces/view-builder";

export default class LoginView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("section", { id: "login-page" });
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
