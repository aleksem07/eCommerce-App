import { FormCheckProps } from "./form-check.types";
import FormCheckView from "./form-check.view";

export default class FormCheckComponent {
  private view: FormCheckView;

  constructor({ formName, inputName }: FormCheckProps) {
    // Initialize the FormCheckView with the provided formName and inputName
    this.view = new FormCheckView({ formName, inputName });
  }

  /**
   * Initialize the FormCheckComponent by rendering the view
   * @returns {HTMLElement} - The rendered view element
   */
  init(): HTMLElement {
    return this.view.render();
  }
}
