import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserDataView extends ViewBuilder {
  private element: HTMLDivElement;
  private header: HTMLHeadingElement;
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.header = this.createElement("h1");
    this.header.textContent = "My profile";

    this.element = this.createElement("div");

    this.button = this.createElement("button", { classes: ["btn", "btn-primary"] });
    this.button.textContent = "Save changes";
  }

  render() {
    this.element.append(this.header, this.button);

    return this.element;
  }
}
