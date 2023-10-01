import { FormCheckProps } from "./form-check.types";
import FormCheckView from "./form-check.view";

export default class FormCheckComponent {
  private view: FormCheckView;

  constructor({ labelText, formName, inputName, checked, disabled }: FormCheckProps) {
    this.view = new FormCheckView({ labelText, formName, inputName, checked, disabled });
  }

  init(): HTMLElement {
    return this.view.render();
  }
}
