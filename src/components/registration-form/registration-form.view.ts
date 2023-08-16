import { ViewBuilder } from "@Interfaces/view-builder";

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
    });
    this.container = this.createElement("div", {
      id: `login-container`,
      classes: ["col-md-3", "m-auto", "container"],
    });

    this.header = this.createElement("h1", {
      id: `login-header`,
      classes: ["h3", "mb-3", "fw-normal", "text-center", "py-5"],
    });
    this.header.textContent = `Register`;
    this.submitButton = this.createElement("button", {
      id: `login-submit-button`,
      classes: ["btn", "btn-primary", "mt-4", "col-12"],
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
    handler: (username: string, email: string, password: string, confirmPassword: string) => void
  ) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const usernameInput = this.getElement<HTMLInputElement>("#registration-username-input");
      const emailInput = this.getElement<HTMLInputElement>("#registration-email-input");
      const passwordInput = this.getElement<HTMLInputElement>("#registration-password-input");
      const confirmPasswordInput = this.getElement<HTMLInputElement>(
        "#registration-confirm-password-input"
      );
      const username = usernameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      handler(username, email, password, confirmPassword);
    });
  }

  render(...elements: HTMLElement[]) {
    this.form.append(...elements, this.submitButton);
    this.container.append(this.header, this.form);
    this.appendTo("#registration-page", this.container);
  }
}
