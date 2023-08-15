import { ViewBuilder } from "@Interfaces/view-builder";

export default class LoginView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("section", {
      id: "login-page",
      classes: ["d-flex", "align-items-center", "py-4"],
    });
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
