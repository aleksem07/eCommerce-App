import { ViewBuilder } from "@Interfaces/view-builder";
import { FormInput } from "./login-form.types";

export default class LoginFormView extends ViewBuilder {
  private form: HTMLFormElement;
  private container: HTMLDivElement;
  private header: HTMLHeadingElement;
  submitButton: HTMLButtonElement;
  paragraph: HTMLParagraphElement;
  registrationLinkWrapper: HTMLDivElement;

  constructor() {
    super();

    this.form = this.createElement("form", {
      id: `login-form`,
    });

    this.container = this.createElement("div", {
      id: `login-container`,
      classes: ["col-10", "col-md-7", "col-lg-5", "col-xl-4", "m-auto", "container"],
    });

    this.header = this.createElement("h1", {
      id: `login-header`,
      classes: ["h3", "my-3", "fw-normal", "text-center"],
    });
    this.header.textContent = `Sign in`;

    this.paragraph = this.createElement("p", {
      id: `login-paragraph`,
      classes: ["text-center", "mb-3", "text-muted"],
    });
    this.paragraph.textContent =
      "Sign in to your account using email and password provided during registration.";

    this.submitButton = this.createElement("button", {
      id: `login-submit-button`,
      classes: ["btn", "btn-primary", "mt-4", "col-12"],
    });
    this.submitButton.setAttribute("type", "submit");
    this.submitButton.textContent = "Sign in";

    this.registrationLinkWrapper = this.createElement("div", {
      classes: ["mt-3", "text-muted"],
      id: `registration-link-wrapper`,
    });
    this.registrationLinkWrapper.textContent = "Don't have an account?";
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

  render(
    email: HTMLElement,
    password: HTMLElement,
    showPassword: HTMLElement,
    registrationLink: HTMLElement
  ) {
    this.registrationLinkWrapper.append(registrationLink);
    this.form.append(
      email,
      password,
      showPassword,
      this.submitButton,
      this.registrationLinkWrapper
    );
    this.container.append(this.header, this.paragraph, this.form);
    this.appendTo("#login-page", this.container);
  }
}
