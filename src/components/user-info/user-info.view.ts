import { ViewBuilder } from "@Interfaces/view-builder";
import { UserInfoElements, UserInfoFormData } from "./user-info.types";

export default class UserInfoView extends ViewBuilder {
  private header: HTMLHeadingElement;
  private form: HTMLFormElement;
  private saveButton: HTMLButtonElement;
  private editButton: HTMLButtonElement;

  constructor() {
    super();
    this.header = this.createElement<HTMLHeadingElement>("h4", {
      classes: ["d-flex", "align-items-center", "justify-content-between"],
    });
    this.header.textContent = "Personal Information";
    this.form = this.createElement<HTMLFormElement>("form", {
      id: "user-info",
      classes: ["row", "g-3"],
    });

    this.saveButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-primary", "btn-sm"],
    });
    this.saveButton.textContent = "Save";
    this.saveButton.type = "submit";
    this.header.append(this.saveButton);

    this.editButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-secondary", "btn-sm"],
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

  submitFormListener(handler: (inputValues: UserInfoFormData) => void) {
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

  private appendInputToColumn(input: HTMLElement) {
    const column = this.createElement("div", { classes: ["col-12", "col-lg-6"] });
    column.appendChild(input);
    this.form.appendChild(column);
  }

  render({
    firstNameInput,
    lastNameInput,
    emailInput,
    dateOfBirthInput,
    isEditMode,
  }: UserInfoElements) {
    this.form.innerHTML = "";
    this.toggleButtons(isEditMode);

    this.appendInputToColumn(firstNameInput);
    this.appendInputToColumn(lastNameInput);
    this.appendInputToColumn(emailInput);
    this.appendInputToColumn(dateOfBirthInput);

    this.form.prepend(this.header);

    return this.form;
  }
}
