import { ViewBuilder } from "@Interfaces/view-builder";
import { UserDataElements } from "./user-data.types";

export default class UserDataView extends ViewBuilder {
  element: HTMLDivElement;

  constructor() {
    super();
    this.element = this.createElement<HTMLDivElement>("div");
  }

  render({ userInfo, userPassword, userShippingAddress, userBillingAddress }: UserDataElements) {
    const elements = [userInfo, userPassword, userShippingAddress];

    if (userBillingAddress) {
      elements.push(userBillingAddress);
    }
    this.element.append(...elements);

    return this.element;
  }
}
