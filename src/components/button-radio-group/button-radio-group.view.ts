import { ViewBuilder } from "@Interfaces/view-builder";
import { ButtonRadioGroupButton } from "./button-radio-group.types";

export default class ButtonRadioGroupView extends ViewBuilder {
  private element: HTMLElement;

  constructor(buttons: ButtonRadioGroupButton[], inputName: string, disabled = false) {
    super();
    this.element = this.createElement("div", {
      classes: ["btn-group"],
    });

    buttons.forEach(({ button, checked }, ind) => {
      const buttonId = `${inputName}-${ind}`;
      const radio = this.createElement<HTMLInputElement>("input", {
        classes: ["btn-check"],
        id: buttonId,
      });
      radio.type = "radio";
      radio.name = inputName;
      radio.checked = !!checked;
      radio.disabled = disabled;

      const label = this.createElement<HTMLLabelElement>("label", {
        classes: ["btn", "btn-outline-secondary"],
      });
      label.htmlFor = buttonId;
      label.textContent = button;

      this.element.append(radio, label);
    });
  }

  render() {
    return this.element;
  }
}
