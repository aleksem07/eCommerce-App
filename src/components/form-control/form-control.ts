import FormControlView from "./form-control.view";
import { FormControlProps } from "./form-control.types";
import ValidatorUtil from "@Utils/validator/validator";

export default class FormControlComponent {
  private view: FormControlView;
  validator: ValidatorUtil;
  form: string;
  inputName: string;

  /**
   * Constructs a new FormControlComponent instance.
   * @param {FormControlProps} props - The props for the component.
   */
  constructor({ formName, inputName, labelText, helpText }: FormControlProps) {
    this.view = new FormControlView({ formName, inputName, labelText, helpText });
    this.validator = new ValidatorUtil();

    this.form = formName;
    this.inputName = inputName;

    this.view.inputListener(this.inputHandler.bind(this));
  }

  /**
   * Handles the input event and performs validation.
   * @param {string} inputText - The input text.
   */
  async inputHandler(inputText: string) {
    const inputValid = await this.validator.validate(this.inputName, inputText);

    if (inputValid) {
      this.view.showValidation(inputValid);
    }
  }

  /**
   * Initializes the component and renders the view.
   * @returns {Promise<void>} A promise that resolves when the view is rendered.
   */
  init() {
    return this.view.render();
  }
}
