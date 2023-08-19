import { FormCheckProps } from "./form-check.types";
import FormCheckView from "./form-check.view";

export default class FormCheckComponent {
  private view: FormCheckView;

  constructor({ inputTitle, formName, inputName }: FormCheckProps) {
    this.view = new FormCheckView({ inputTitle, formName, inputName });
  }

  init(): HTMLElement {
    return this.view.render();
  }
}
