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

  private appendInputToColumn(input: HTMLElement, columnClasses = ["col-6"]) {
    const column = this.createElement("div", { classes: columnClasses });
    column.appendChild(input);
    this.element.appendChild(column);
  }

  render({
    countryInput,
    cityInput,
    streetInput,
    postalCodeInput,
    isDefaultAddress,
  }: {
    countryInput: HTMLElement;
    cityInput: HTMLElement;
    streetInput: HTMLElement;
    postalCodeInput: HTMLElement;
    isDefaultAddress: HTMLElement;
  }) {
    this.element.appendChild(this.headerElement);

    this.appendInputToColumn(isDefaultAddress, ["col-12"]);
    this.appendInputToColumn(countryInput);
    this.appendInputToColumn(cityInput);
    this.appendInputToColumn(streetInput);
    this.appendInputToColumn(postalCodeInput);

    return this.element;
  }
}
