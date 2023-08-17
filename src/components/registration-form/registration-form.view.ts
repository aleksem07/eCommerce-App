import { ViewBuilder } from "@Interfaces/view-builder";
import { FormInput } from "./registration-form.types";

export default class RegistrationFormView extends ViewBuilder {
  private form!: HTMLFormElement;
  private container!: HTMLDivElement;
  private header!: HTMLHeadingElement;
  submitButton!: HTMLButtonElement;
  confirmPasswordInput!: HTMLInputElement;

  constructor() {
    super();

    this.form = this.createElement("form", {
      id: `registration-form`,
      classes: ["d-flex", "flex-column"],
    });
    this.container = this.createElement("div", {
      id: `registration-container`,
      classes: ["col-md-4", "m-auto", "container"],
    });

    this.header = this.createElement("h1", {
      id: `registration-header`,
      classes: ["h3", "mb-3", "fw-normal", "text-center", "py-5"],
    });
    this.header.textContent = `Register`;
    this.submitButton = this.createElement("button", {
      id: `registration-submit-button`,
      classes: ["btn", "btn-primary", "mt-4", "align-self-center"],
    });
    this.submitButton.setAttribute("type", "submit");
    this.submitButton.textContent = "Submit";

    this.confirmPasswordInput = this.createElement("input", {
      id: `registration-confirm-password-input`,
      classes: ["form-control"],
    });
    this.confirmPasswordInput.type = "password";
    this.confirmPasswordInput.placeholder = "Confirm Password";
  }

  submitFormListener(handler: (inputValues: FormInput[]) => void) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);

      const inputValues: FormInput[] = [...formData.entries()].map(([key, value]) => ({
        key,
        value: value.toString(),
      }));

      handler(inputValues);
    });
  }

  checkboxListener(handler: (status: boolean) => void) {
    const passwordInput: HTMLInputElement = this.getElement("#registration-password-input");
    const passwordCheckbox: HTMLInputElement = this.getElement("#password-checkbox-input");

    if (passwordInput) passwordInput.setAttribute("type", "password");

    if (passwordCheckbox) {
      passwordCheckbox.addEventListener("change", (event) => {
        event.preventDefault();

        handler(passwordCheckbox.checked);
      });
    }
  }

  handleCheckboxResult(status: boolean) {
    const passwordInput: HTMLInputElement = this.getElement("#registration-password-input");

    if (status) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  render(...elements: HTMLElement[]) {
    this.form.append(...elements, this.submitButton);
    this.container.append(this.header, this.form);
    this.appendTo("#registration-page", this.container);
  }
}
