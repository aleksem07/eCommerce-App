import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserDataView extends ViewBuilder {
  private element: HTMLDivElement;
  private header: HTMLHeadingElement;
  private saveButton: HTMLButtonElement;
  private editButton: HTMLButtonElement;

  constructor() {
    super();
    this.header = this.createElement("h1", {
      classes: ["d-flex", "align-items-center", "justify-content-between"],
    });
    this.header.textContent = "My profile";
    this.element = this.createElement("div");

    this.saveButton = this.createElement("button", { classes: ["btn", "btn-primary"] });
    this.saveButton.textContent = "Save";
    this.header.append(this.saveButton);

    this.editButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-secondary"],
    });
    this.editButton.textContent = "Edit";
    this.header.append(this.editButton);
  }

  private toggleButtons(isEditMode: boolean) {
    if (isEditMode) {
      this.editButton.classList.add("d-none");
      this.saveButton.classList.remove("d-none");
    } else {
      this.editButton.classList.remove("d-none");
      this.saveButton.classList.add("d-none");
    }
  }

  editButtonListener(handler: () => void) {
    this.editButton?.addEventListener("click", handler);
  }

  saveButtonListener(handler: () => void) {
    this.saveButton?.addEventListener("click", handler);
  }

  render({
    userInfo,
    userPassword,
    userShippingAddress,
    userBillingAddress,
    isEditMode,
  }: {
    userInfo: HTMLElement;
    userPassword: HTMLElement;
    userShippingAddress: HTMLElement;
    userBillingAddress?: HTMLElement;
    isEditMode: boolean;
  }) {
    this.element.innerHTML = "";
    this.toggleButtons(isEditMode);
    const elements = [this.header, userInfo, userPassword, userShippingAddress];

    if (userBillingAddress) {
      elements.push(userBillingAddress);
    }
    this.element.append(...elements);

    return this.element;
  }
}
