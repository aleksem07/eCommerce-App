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
  loginLinkWrapper: HTMLDivElement;
  paragraph: HTMLParagraphElement;

  constructor() {
    super();
    this.form = this.createElement("form", {
      id: `registration-form`,
      classes: ["d-flex", "flex-column"],
    });
    this.container = this.createElement("div", {
      id: `registration-container`,
      classes: ["col-10", "col-md-7", "col-lg-5", "col-xl-4", "m-auto", "container"],
    });
    this.header = this.createElement("h1", {
      id: `registration-header`,
      classes: ["h3", "my-3", "fw-normal", "text-center"],
    });
    this.header.textContent = `Sign up`;
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
      classes: ["btn", "btn-primary", "mt-4"],
    });
    this.submitButton.setAttribute("type", "submit");
    this.submitButton.textContent = "Sign up";
    this.confirmPasswordInput = this.createElement("input", {
      id: `registration-confirm-password-input`,
      classes: ["form-control"],
    });
    this.confirmPasswordInput.type = "password";
    this.confirmPasswordInput.placeholder = "Confirm Password";
    this.loginLinkWrapper = this.createLoginLinkWrapper();
    this.paragraph = this.createRegistrationParagraph();
  }

  private createLoginLinkWrapper() {
    this.loginLinkWrapper = this.createElement("div", {
      classes: ["mt-3", "text-muted"],
      id: `login-link-wrapper`,
    });
    this.loginLinkWrapper.textContent = "Already have an account?";

    return this.loginLinkWrapper;
  }

  private createRegistrationParagraph() {
    this.paragraph = this.createElement("p", {
      id: `registration-paragraph`,
      classes: ["text-center", "mb-3", "text-muted"],
    });
    this.paragraph.textContent =
      "Registration takes less than a minute but gives you full control over your orders.";

    return this.paragraph;
  }

  clearFormContent() {
    this.form.innerHTML = "";
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

  render(loginLink: HTMLElement, ...elements: HTMLElement[]) {
    this.loginLinkWrapper.append(loginLink);
    this.form.append(...elements, this.submitButton, this.loginLinkWrapper);
    this.container.append(this.header, this.paragraph, this.form);
    this.appendTo("#registration-page", this.container);
  }
}
