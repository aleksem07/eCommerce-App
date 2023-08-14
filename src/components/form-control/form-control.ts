import FormControlView from "./form-control.view";
import ValidatorUtil from "@Utils/validator/validator";

export default class FormControlComponent {
  private view: FormControlView;
  validator: ValidatorUtil;
  form: string;
  inputName: string;

  constructor(formName: string, inputName: string, labelText: string, helpText: string) {
    this.form = formName;
    this.inputName = inputName;
    this.view = new FormControlView(formName, inputName, labelText, helpText);
    this.validator = new ValidatorUtil();
    this.view.inputListener(this.inputHandler.bind(this));
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
