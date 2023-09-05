import { ViewBuilder } from "@Interfaces/view-builder";
import { UserAddressElements, UserAddressFormData } from "./user-address.types";

export default class UserAddressView extends ViewBuilder {
  private form: HTMLFormElement;
  private headerElement: HTMLHeadingElement;
  private saveButton: HTMLButtonElement;
  private editButton: HTMLButtonElement;

  constructor(header: string) {
    super();
    this.form = this.createElement("form", { classes: ["row", "g-3", "mt-3"] });
    this.headerElement = this.createElement<HTMLHeadingElement>("h5", {
      classes: ["d-flex", "align-items-center", "justify-content-between"],
    });
    this.headerElement.textContent = header;

    this.saveButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-primary", "btn-sm"],
    });
    this.saveButton.textContent = "Save";
    this.saveButton.type = "submit";
    this.headerElement.append(this.saveButton);

    this.editButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-secondary", "btn-sm"],
    });
    this.editButton.textContent = "Edit";
    this.editButton.type = "button";
    this.headerElement.append(this.editButton);
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

  submitFormListener(handler: (inputValues: UserAddressFormData) => void) {
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

  private appendInputToColumn(input: HTMLElement, columnClasses = ["col-12", "col-lg-6"]) {
    const column = this.createElement("div", { classes: columnClasses });
    column.appendChild(input);
    this.form.appendChild(column);
  }

  render({
    countryInput,
    cityInput,
    streetInput,
    postalCodeInput,
    isDefaultAddress,
    addressTypes,
    isEditMode,
  }: UserAddressElements) {
    this.form.innerHTML = "";
    this.toggleButtons(isEditMode);
    this.form.appendChild(this.headerElement);

    this.appendInputToColumn(isDefaultAddress, ["col-12"]);
    this.appendInputToColumn(addressTypes, ["col-12"]);
    this.appendInputToColumn(countryInput);
    this.appendInputToColumn(cityInput);
    this.appendInputToColumn(streetInput);
    this.appendInputToColumn(postalCodeInput);

    return this.form;
  }
}
