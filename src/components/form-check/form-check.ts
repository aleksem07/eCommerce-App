import { FormCheckProps } from "./form-check.types";
import FormCheckView from "./form-check.view";

export default class FormCheckComponent {
  private view: FormCheckView;

  constructor({ formName, inputName }: FormCheckProps) {
    this.view = new FormCheckView({ formName, inputName });
    this.view.checkboxListener(this.checkboxHandler.bind(this));
  }

  async checkboxHandler(status: boolean) {
    this.view.handleChecboxResult(status);
  }

  init() {
    return this.view.render();
  }
}
