import FormSelectView from "./form-select.view";
import ValidatorUtil from "@Utils/validator/validator";

export default class FormSelectComponent {
  private view: FormSelectView;
  validator: ValidatorUtil;
  form: string;
  inputName: string;

  constructor(
    formName: string,
    inputName: string,
    labelText: string,
    helpText: string,
    options: { label: string; value: string }[]
  ) {
    this.view = new FormSelectView({
      formName,
      inputName,
      labelText,
      helpText,
      options,
    });
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
