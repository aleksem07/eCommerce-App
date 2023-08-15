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
      classes: ["form-signin", "w-50", "m-auto"],
    });
    this.header = this.createElement("h1", {
      id: `login-header`,
      classes: ["h3", "mb-3", "fw-normal", "text-center"],
    });
    this.header.textContent = `Login`;
    this.submitButton = this.createElement("button", {
      id: `login-submit-button`,
      classes: ["btn", "btn-primary", "col-12"],
    });
    this.submitButton.setAttribute("type", "submit");
    this.submitButton.textContent = "Submit";
  }

  /**
   * Attaches a submit event listener to the form.
   * @param {Function} handler - The handler function to be called when the form is submitted.
   */
  submitFormListener(handler: (email: string, password: string) => void) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = (this.getElement("#login-email-input") as HTMLInputElement).value;
      const password = (this.getElement("#login-password-input") as HTMLInputElement).value;
      handler(email, password);
    });
  }

  /**
   * Attaches a change event listener to the password checkbox.
   * @param {Function} handler - The handler function to be called when the checkbox is changed.
   */
  checkboxListener(handler: (status: boolean) => void) {
    const passwordInput = this.getElement("#login-password-input");
    const passwordCheckbox = this.getElement("#password-checkbox-input");

    if (passwordInput) passwordInput?.setAttribute("type", "password");

    if (passwordCheckbox) {
      passwordCheckbox.addEventListener("change", (event) => {
        event.preventDefault();

        handler((passwordCheckbox as HTMLInputElement).checked);
      });
    }
  }

  /**
   * Handles the result of the checkbox change event.
   * @param {boolean} status - The status of the checkbox (checked or unchecked).
   */
  handleCheckboxResult(status: boolean) {
    const passwordInput = this.getElement("#login-password-input");

    if (status) {
      (passwordInput as HTMLInputElement).type = "text";
    } else {
      (passwordInput as HTMLInputElement).type = "password";
    }
  }

  /**
   * Renders the login form view.
   * @param {...HTMLElement} elements - The elements to be appended to the form.
   */
  render(...elements: HTMLElement[]) {
    this.form.append(...elements, this.submitButton);
    this.container.append(this.header, this.form);
    this.appendTo("#login-page", this.container);
  }
}
