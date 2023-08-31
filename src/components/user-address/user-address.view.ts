import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserAddressView extends ViewBuilder {
  private element: HTMLElement;
  headerElement: HTMLHeadingElement;

  constructor(header: string) {
    super();
    this.element = this.createElement("div", { classes: ["row", "g-3", "mt-3"] });
    this.headerElement = this.createElement<HTMLHeadingElement>("h5");
    this.headerElement.textContent = header;
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
    this.element.appendChild(this.headerElement);

    this.appendInputToColumn(countryInput);
    this.appendInputToColumn(cityInput);
    this.appendInputToColumn(streetInput);
    this.appendInputToColumn(postalCodeInput);

    return this.element;
  }
}
