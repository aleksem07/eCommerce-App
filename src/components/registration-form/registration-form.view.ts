import { ViewBuilder } from "@Interfaces/view-builder";
import { FormInput } from "./registration-form.types";

export default class RegistrationFormView extends ViewBuilder {
  private form: HTMLFormElement;
  private container: HTMLDivElement;
  private header: HTMLHeadingElement;
  submitButton: HTMLButtonElement;
  confirmPasswordInput: HTMLInputElement;
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
      classes: ["col-md-4", "m-auto", "container"],
    });

    this.header = this.createElement("h1", {
      id: `registration-header`,
      classes: ["h3", "my-3", "fw-normal", "text-center"],
    });
    this.header.textContent = `Sign up`;
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

    this.loginLinkWrapper = this.createLoginLinkWrapper();
    this.paragraph = this.createRegistrationParagraph();
  }

  private createLoginLinkWrapper() {
    this.loginLinkWrapper = this.createElement("div", {
      classes: ["mt-3", "text-muted"],
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

  render(
    email: HTMLElement,
    password: HTMLElement,
    passwordCheck: HTMLElement,
    firstName: HTMLElement,
    lastName: HTMLElement,
    dateOfBirth: HTMLElement,
    country: HTMLElement,
    city: HTMLElement,
    street: HTMLElement,
    postalCode: HTMLElement,
    loginLink: HTMLElement
  ) {
    this.loginLinkWrapper.append(loginLink);
    this.form.append(
      email,
      password,
      passwordCheck,
      firstName,
      lastName,
      dateOfBirth,
      country,
      city,
      street,
      postalCode,
      this.submitButton,
      this.loginLinkWrapper
    );
    this.container.append(this.header, this.paragraph, this.form);
    this.appendTo("#registration-page", this.container);
  }
}
