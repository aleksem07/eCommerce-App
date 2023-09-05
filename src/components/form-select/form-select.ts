import { FormSelectProps } from "./form-select.types";
import FormSelectView from "./form-select.view";
import ValidatorUtil from "@Utils/validator/validator";

export default class FormSelectComponent {
  private view: FormSelectView;
  validator: ValidatorUtil;
  form: string;
  inputName: string;

  constructor({
    formName,
    inputName,
    labelText,
    helpText,
    options,
    classes,
    disabled,
    value,
  }: FormSelectProps) {
    this.view = new FormSelectView({
      formName,
      inputName,
      labelText,
      helpText,
      options,
      classes,
      disabled,
      value,
    });
    this.validator = new ValidatorUtil();

    this.form = formName;
    this.inputName = inputName;
    this.view.inputListener(this.inputHandler.bind(this));
  }

  validate() {
    this.inputHandler(this.view.select.value);
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
