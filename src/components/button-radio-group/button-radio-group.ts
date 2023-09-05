import { ButtonRadioGroupButton } from "./button-radio-group.types";
import ButtonRadioGroupView from "./button-radio-group.view";

export default class ButtonRadioGroupComponent {
  private view: ButtonRadioGroupView;

  constructor(buttons: ButtonRadioGroupButton[], inputName: string, disabled = false) {
    this.view = new ButtonRadioGroupView(buttons, inputName, disabled);
  }

  init() {
    return this.view.render();
  }
}
