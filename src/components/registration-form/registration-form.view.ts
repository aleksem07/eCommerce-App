import { ViewBuilder } from "@Interfaces/view-builder";
import { FormInput } from "./registration-form.types";

export default class RegistrationFormView extends ViewBuilder {
  private form: HTMLFormElement;
  private container: HTMLDivElement;
  private header: HTMLHeadingElement;
  submitButton: HTMLButtonElement;
  confirmPasswordInput: HTMLInputElement;
  addressShippingTitle: HTMLHeadingElement;
  addressBillingTitle: HTMLHeadingElement;

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
    this.addressShippingTitle = this.createElement("h2", {
      id: `address-default-title`,
      classes: ["h4", "fw-normal", "text-center", "py-3"],
    });
    this.addressShippingTitle.textContent = `Shipping Address`;
    this.addressBillingTitle = this.createElement("h2", {
      id: `address-default-billing-title`,
      classes: ["h4", "fw-normal", "text-center", "py-3"],
    });
    this.addressBillingTitle.textContent = `Billing Address`;
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

  submitFormListener(
    handler: (inputValues: FormInput[], registrationData: Record<string, string>) => void
  ) {
    const inputSelectors = {
      email: "#registration-email-input",
      password: "#registration-password-input",
      firstName: "#registration-first-name-input",
      lastName: "#registration-last-name-input",
      dateOfBirth: "#registration-date-of-birth-input",
      country: "#registration-country-input",
      city: "#registration-city-input",
      streetName: "#registration-street-input",
      postalCode: "#registration-postal-code-input",
    };

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);

      const inputValues: FormInput[] = [...formData.entries()].map(([key, value]) => ({
        key,
        value: value.toString(),
      }));

      const registrationData = Object.fromEntries(
        Object.entries(inputSelectors).map(([name, selector]) => [
          name,
          (this.getElement(selector) as HTMLInputElement).value,
        ])
      );

      handler(inputValues, registrationData);
    });
  }

  checkboxListener(handler: (status: boolean) => void) {
    const passwordInput = this.getElement<HTMLInputElement>("#registration-password-input");
    const passwordCheckbox = this.getElement<HTMLInputElement>("#password-checkbox-input");

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

  checkboxAddressListener(elementId: string, handler: (status: boolean) => void) {
    const addressCheckbox = this.getElement<HTMLInputElement>(`#${elementId}`);

    if (addressCheckbox) {
      addressCheckbox.addEventListener("change", (event) => {
        event.preventDefault();

        handler(addressCheckbox.checked);
      });
    }
  }

  checkboxDefaultAddressResult(status: boolean) {
    return status;
  }

  render(...elements: HTMLElement[]) {
    this.form.append(...elements, this.submitButton);
    this.container.append(this.header, this.form);
    this.appendTo("#registration-page", this.container);
  }
}
