import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserAddressView extends ViewBuilder {
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
    countryInput,
    cityInput,
    streetInput,
    postalCodeInput,
  }: {
    countryInput: HTMLElement;
    cityInput: HTMLElement;
    streetInput: HTMLElement;
    postalCodeInput: HTMLElement;
  }) {
    this.appendInputToColumn(countryInput);
    this.appendInputToColumn(cityInput);
    this.appendInputToColumn(streetInput);
    this.appendInputToColumn(postalCodeInput);

    return this.element;
  }
}
