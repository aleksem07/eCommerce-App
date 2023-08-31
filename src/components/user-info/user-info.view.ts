import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserInfoView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", { classes: ["row", "g-3"] });
  }

  private appendInputToColumn(input: HTMLElement) {
    const column = this.createElement("div", { classes: ["col-12", "col-lg-6"] });
    column.appendChild(input);
    this.element.appendChild(column);
  }

  render({
    firstNameInput,
    lastNameInput,
    emailInput,
    dateOfBirthInput,
  }: {
    firstNameInput: HTMLElement;
    lastNameInput: HTMLElement;
    emailInput: HTMLElement;
    dateOfBirthInput: HTMLElement;
  }) {
    this.appendInputToColumn(firstNameInput);
    this.appendInputToColumn(lastNameInput);
    this.appendInputToColumn(emailInput);
    this.appendInputToColumn(dateOfBirthInput);

    return this.element;
  }
}
