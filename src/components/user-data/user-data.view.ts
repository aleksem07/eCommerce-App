import { ViewBuilder } from "@Interfaces/view-builder";
import { UserDataElements } from "./user-data.types";

export default class UserDataView extends ViewBuilder {
  element: HTMLDivElement;
  header: HTMLHeadingElement;

  constructor() {
    super();
    this.element = this.createElement<HTMLDivElement>("div");
    this.header = this.createElement<HTMLHeadingElement>("h1");
    this.header.textContent = "My Profile";
  }

  render({ userInfo, userPassword, userShippingAddress, userBillingAddress }: UserDataElements) {
    const elements = [userInfo, userPassword, userShippingAddress];

    if (userBillingAddress) {
      elements.push(userBillingAddress);
    }
    this.element.append(this.header, ...elements);

    return this.element;
  }
}
