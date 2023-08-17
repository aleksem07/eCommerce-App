import { ViewBuilder } from "@Interfaces/view-builder";

export default class RegistrationView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      id: "registration-page",
      classes: ["d-flex", "align-items-center", "flex-column", "py-4"],
    });
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
