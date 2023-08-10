import { ViewBuilder } from "@Interfaces/view-builder";

export default class RegistrationView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
    this.element.textContent = "REGISTRATION PAGE";
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
