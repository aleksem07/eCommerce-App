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

    this.button = this.createElement("button", { classes: ["btn", "btn-primary", "mt-4"] });
    this.button.textContent = "Save changes";
  }

  render({
    userInfo,
    userPassword,
    userShippingAddress,
    userBillingAddress,
  }: {
    userInfo: HTMLElement;
    userPassword: HTMLElement;
    userShippingAddress: HTMLElement;
    userBillingAddress?: HTMLElement;
  }) {
    const elements = [this.header, userInfo, userPassword, userShippingAddress];

    if (userBillingAddress) {
      elements.push(userBillingAddress);
    }
    this.element.append(...elements, this.button);

    return this.element;
  }
}