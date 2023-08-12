import FormInputView from "./form-input.view";

export default class FormInputComponent {
  private view: FormInputView;

  constructor(formName: string, inputName: string, labelText: string, helpText: string) {
    this.view = new FormInputView(formName, inputName, labelText, helpText);
  }

  init() {
    this.view.render();
  }
}
