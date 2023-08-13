import FormInputView from "./form-input.view";
import ValidatorUtil from "@Utils/validator/validator";

export default class FormInputComponent {
  private view: FormInputView;
  validator: ValidatorUtil;
  form: string;
  inputName: string;

  constructor(
    formName: string,
    inputName: string,
    labelText: string,
    helpText: string,
    checkbox: boolean
  ) {
    this.form = formName;
    this.inputName = inputName;
    this.view = new FormInputView(formName, inputName, labelText, helpText, checkbox);
    this.validator = new ValidatorUtil();
    this.view.inputListener(this.inputHandler.bind(this));
    this.view.checkboxListener(this.checkboxHandler.bind(this));
  }

  async checkboxHandler(status: boolean) {
    this.view.handleChecboxResult(status);
  }

  async inputHandler(inputText: string) {
    const inputValid = await this.validator.validate(this.inputName, inputText);

    if (inputValid) {
      this.view.handleInputValidationResult(inputValid);
    }
  }

  init() {
    this.view.render();
  }
}
