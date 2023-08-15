import { FormCheckProps } from "./form-check.types";
import FormCheckView from "./form-check.view";

export default class FormCheckComponent {
  private view: FormCheckView;

  constructor({ formName, inputName }: FormCheckProps) {
    this.view = new FormCheckView({ formName, inputName });
  }

  init() {
    return this.view.render();
  }
}
