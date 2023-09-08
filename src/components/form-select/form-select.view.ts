import { ViewBuilder } from "@Interfaces/view-builder";
import { ValidationResult } from "@Utils/validator/validator.types";
import { FormSelectProps } from "./form-select.types";

export default class FormSelectView extends ViewBuilder {
  formName: string;
  inputName: string;
  inputWrapper: HTMLElement;
  inputLabel: HTMLLabelElement;
  select: HTMLSelectElement;
  inputHelp: HTMLElement;
  selectedValue: string;

  constructor({
    formName,
    inputName,
    labelText,
    helpText = "",
    options,
    classes,
    disabled = false,
    value = "",
  }: FormSelectProps) {
    super();
    this.formName = formName;
    this.inputName = inputName;
    this.selectedValue = value;
    this.inputWrapper = this.createElement("div", {
      id: `${formName}-${inputName}-wrapper`,
      classes: classes ? [...classes] : ["mt-2"],
    });
    this.inputLabel = this.createElement("label", {
      id: `${formName}-${inputName}-label`,
      classes: ["form-label"],
    });
    this.inputLabel.setAttribute("for", `${formName}-${inputName}-input`);
    this.inputLabel.textContent = labelText;
    this.select = this.createElement<HTMLSelectElement>("select", {
      id: `${formName}-${inputName}-input`,
      classes: ["form-select"],
    });
    this.select.name = inputName;
    this.select.disabled = disabled;
    const optionElements = options.map(this.mapOption.bind(this));
    this.select.append(...optionElements);
    this.inputHelp = this.createElement("small", {
      id: `${helpText}-help`,
      classes: ["form-text", "h6"],
    });
    this.inputHelp.textContent = helpText;
  }

  mapOption(option: { label: string; value: string }) {
    const optionElement = this.createElement<HTMLOptionElement>("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    optionElement.selected = option.value === this.selectedValue;

    return optionElement;
  }

  inputListener(handler: (text: string) => void) {
    this.select.addEventListener("change", (event) => {
      const inputText = (event.target as HTMLSelectElement).value;
      handler(inputText);
    });
  }

  showValidation(resultValid: ValidationResult) {
    this.inputHelp.textContent = resultValid.message || "\u00A0";

    if (resultValid.isValid) {
      this.select.classList.remove("is-invalid");
      this.select.classList.add("is-valid");
      this.inputHelp.classList.remove("invalid-feedback");
    } else {
      this.select.classList.remove("is-valid");
      this.select.classList.add("is-invalid");
      this.inputHelp.classList.add("invalid-feedback");
    }
  }

  render() {
    this.inputWrapper.append(this.inputLabel, this.select, this.inputHelp);

    return this.inputWrapper;
  }
}
