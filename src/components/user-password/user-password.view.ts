import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserPasswordView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", { classes: ["row", "g-3", "mt-2"] });
  }

  private appendInputToColumn(input: HTMLElement) {
    const column = this.createElement("div", { classes: ["col-6"] });
    column.appendChild(input);
    this.element.appendChild(column);
  }

  render({
    newPasswordInput,
    confirmPasswordInput,
  }: {
    newPasswordInput: HTMLElement;
    confirmPasswordInput: HTMLElement;
  }) {
    this.appendInputToColumn(newPasswordInput);
    this.appendInputToColumn(confirmPasswordInput);

    return this.element;
  }
}
