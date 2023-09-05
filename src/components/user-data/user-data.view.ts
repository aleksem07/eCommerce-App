import { ViewBuilder } from "@Interfaces/view-builder";
import { UserDataElements } from "./user-data.types";

export default class UserDataView extends ViewBuilder {
  element: HTMLDivElement;
  header: HTMLHeadingElement;
  addressHeader: HTMLHeadingElement;

  constructor() {
    super();
    this.element = this.createElement<HTMLDivElement>("div");
    this.header = this.createElement<HTMLHeadingElement>("h1");
    this.header.textContent = "My Profile";
    this.addressHeader = this.createElement<HTMLHeadingElement>("h4", {
      classes: ["mt-4"],
    });
    this.addressHeader.textContent = "Addresses";
  }

  private createSeparator() {
    return this.createElement("hr", {
      classes: ["my-5"],
    });
  }

  render({ userInfo, userPassword, userAddresses }: UserDataElements) {
    this.element.append(
      this.header,
      userInfo,
      this.createSeparator(),
      userPassword,
      this.createSeparator(),
      this.addressHeader,
      ...userAddresses
    );

    return this.element;
  }
}
