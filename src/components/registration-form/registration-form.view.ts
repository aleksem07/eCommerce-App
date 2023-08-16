import { ViewBuilder } from "@Interfaces/view-builder";

export default class RegistrationFormView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
  }

  render() {
    this.appendTo("", this.element);
  }
}
