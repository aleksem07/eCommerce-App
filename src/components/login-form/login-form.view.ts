import { ViewBuilder } from "@Interfaces/view-builder";

import Tooltip from "@Components/tooltip/tooltip";
import { AuthResult } from "@Services/auth/auth.types";

export default class LoginFormView extends ViewBuilder {
  private tooltip: Tooltip;
  loginSubmitButton: Element | null;
  constructor() {
    super();
    this.tooltip = new Tooltip();
    this.loginSubmitButton = this.getElement("#login-submit-button");

  }

  submitFormListener(handler: (email: string, password: string) => void) {
    const form = this.getElement("#login-form");

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = this.getElement("#login-email-input");
        const password = this.getElement("#login-password-input");
        let emailValue = "";
        let passwordValue = "";

        if (email instanceof HTMLInputElement) {
          emailValue = email.value;
        }

        if (password instanceof HTMLInputElement) {
          passwordValue = password.value;
        }
        handler(emailValue, passwordValue);
      });
    }
  }


  showNotification(result: AuthResult, message: string) {
    this.tooltip.init(this.loginSubmitButton as HTMLElement, result, message);
  }
}
