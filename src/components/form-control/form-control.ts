import FormControlView from "./form-control.view";
import { FormControlProps } from "./form-control.types";
import ValidatorUtil from "@Utils/validator/validator";

export default class FormControlComponent {
  private view: FormControlView;
  validator: ValidatorUtil;
  form: string;
  inputName: string;

  constructor({ formName, inputName, labelText, helpText, placeholderText }: FormControlProps) {
    this.view = new FormControlView({ formName, inputName, labelText, helpText, placeholderText });
    this.validator = new ValidatorUtil();

    this.form = formName;
    this.inputName = inputName;

    this.view.inputListener(this.inputHandler.bind(this));
  }

  async inputHandler(inputText: string) {
    const inputValid = await this.validator.validate(this.inputName, inputText);

    if (inputValid) {
      this.view.showValidation(inputValid);
    }
  }

  init() {
    return this.view.render();
  }
}
