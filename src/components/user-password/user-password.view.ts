import { ViewBuilder } from "@Interfaces/view-builder";
import { UserPasswordFormData } from "./user-password.types";

export default class UserPasswordView extends ViewBuilder {
  private form: HTMLFormElement;
  private header: HTMLHeadingElement;
  private saveButton: HTMLButtonElement;
  private editButton: HTMLButtonElement;

  constructor() {
    super();
    this.form = this.createElement<HTMLFormElement>("form", {
      id: "user-password",
      classes: ["row", "g-3"],
    });

    this.header = this.createElement<HTMLHeadingElement>("h4", {
      classes: ["d-flex", "align-items-center", "justify-content-between"],
    });
    this.header.textContent = "Password";

    this.saveButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-primary", "btn-sm"],
    });
    this.saveButton.textContent = "Save";
    this.saveButton.type = "submit";
    this.header.append(this.saveButton);

    this.editButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-secondary", "btn-sm"],
    });
    this.editButton.textContent = "Change";
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

  submitFormListener(handler: (inputValues: UserPasswordFormData) => void) {
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
    currentPasswordInput,
    newPasswordInput,
    confirmPasswordInput,
    isEditMode,
  }: {
    currentPasswordInput: HTMLElement;
    newPasswordInput: HTMLElement;
    confirmPasswordInput: HTMLElement;
    isEditMode: boolean;
  }) {
    this.form.innerHTML = "";
    this.toggleButtons(isEditMode);

    this.form.append(this.header);
    this.appendInputToColumn(currentPasswordInput);
    this.appendInputToColumn(newPasswordInput);
    this.appendInputToColumn(confirmPasswordInput);

    return this.form;
  }
}
