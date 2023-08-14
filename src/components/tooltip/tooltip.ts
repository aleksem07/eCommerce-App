import TooltipView from "./tooltip.view";
import { AuthResult } from "../../services/auth/auth.types";

export default class TooltipComponent {
  private view: TooltipView;

  constructor() {
    this.view = new TooltipView();
  }

  init(element: HTMLElement, result: AuthResult, successMessage: string) {
    this.view.render(element, result, successMessage);
  }
}
