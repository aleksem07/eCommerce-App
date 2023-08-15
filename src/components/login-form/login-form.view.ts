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

  submitFormListener(handler: (email: string, password: string) => void) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = (this.getElement("#login-email-input") as HTMLInputElement).value;
      const password = (this.getElement("#login-password-input") as HTMLInputElement).value;
      handler(email, password);
    });
  }

  render(...elements: HTMLElement[]) {
    this.form.append(...elements, this.submitButton);
    this.container.append(this.header, this.form);
    this.appendTo("#login-page", this.container);
  }
}
