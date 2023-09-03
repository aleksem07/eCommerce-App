import { ViewBuilder } from "@Interfaces/view-builder";
import { UserDataFormData } from "./user-data.types";

export default class UserDataView extends ViewBuilder {
  private form: HTMLFormElement;
  private header: HTMLHeadingElement;
  private saveButton: HTMLButtonElement;
  private editButton: HTMLButtonElement;

  constructor() {
    super();
    this.header = this.createElement("h1", {
      classes: ["d-flex", "align-items-center", "justify-content-between"],
    });
    this.header.textContent = "My profile";
    this.form = this.createElement("form", {
      id: "user-data",
    });

    this.saveButton = this.createElement("button", { classes: ["btn", "btn-primary"] });
    this.saveButton.textContent = "Save";
    this.saveButton.type = "submit";
    this.header.append(this.saveButton);

    this.editButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-secondary"],
    });
    this.editButton.textContent = "Edit";
    this.editButton.type = "button";
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

  submitFormListener(handler: (inputValues: UserDataFormData) => void) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.form);
      const inputValues = new Map();

      for (const [key, value] of formData.entries()) {
        inputValues.set(key, value.toString());
      }

      handler(inputValues);
    });
  }

  editButtonListener(handler: () => void) {
    this.editButton?.addEventListener("click", handler);
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
    this.form.innerHTML = "";
    this.toggleButtons(isEditMode);
    const elements = [this.header, userInfo, userPassword, userShippingAddress];

    if (userBillingAddress) {
      elements.push(userBillingAddress);
    }
    this.form.append(...elements);

    return this.form;
  }
}
