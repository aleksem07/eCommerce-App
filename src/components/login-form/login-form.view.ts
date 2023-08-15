import { ViewBuilder } from "@Interfaces/view-builder";

export default class LoginFormView extends ViewBuilder {
  private form: HTMLFormElement;
  private container: HTMLDivElement;
  private header: HTMLHeadingElement;
  submitButton: HTMLButtonElement;

  constructor() {
    super();

    this.form = this.createElement("form", {
      id: `login-form`,
    });
    this.container = this.createElement("div", {
      id: `login-container`,
      classes: ["col-md-3", "m-auto", "container"],
    });

    this.header = this.createElement("h1", {
      id: `login-header`,
      classes: ["h3", "mb-3", "fw-normal", "text-center", "py-5"],
    });
    this.header.textContent = `Login`;
    this.submitButton = this.createElement("button", {
      id: `login-submit-button`,
      classes: ["btn", "btn-primary", "mt-4", "col-12"],
    });
    this.submitButton.setAttribute("type", "submit");
    this.submitButton.textContent = "Submit";
  }

  submitFormListener(handler: (email: string, password: string) => void) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput: HTMLInputElement = this.getElement("#login-email-input");
      const email = emailInput.value;
      const passwordInput: HTMLInputElement = this.getElement("#login-password-input");
      const password = passwordInput.value;
      handler(email, password);
    });
  }

  checkboxListener(handler: (status: boolean) => void) {
    const passwordInput: HTMLInputElement = this.getElement("#login-password-input");
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
    const passwordInput: HTMLInputElement = this.getElement("#login-password-input");

    if (status) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  render(...elements: HTMLElement[]) {
    this.form.append(...elements, this.submitButton);
    this.container.append(this.header, this.form);
    this.appendTo("#login-page", this.container);
  }
}
