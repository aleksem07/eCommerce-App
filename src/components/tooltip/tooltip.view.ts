import { ViewBuilder } from "@Interfaces/view-builder";
import { Popover } from "bootstrap";
import { AuthResult } from "../../services/auth/auth.types";

export default class TooltipView extends ViewBuilder {
  constructor() {
    super();
  }

  showPopover(element: HTMLElement, title: string, content: string, duration: number) {
    const popover = new Popover(element, {
      title: title,
      content: content,
    });
    popover.show();

    setTimeout(() => {
      popover.dispose();
    }, duration);
  }

  handleSuccess(element: HTMLElement, successMessage: string) {
    this.showPopover(element, "Success", successMessage, 1500);
  }

  handleError(element: HTMLElement, errorMessage: string) {
    this.showPopover(element, "Error", errorMessage, 3500);
  }

  render(element: HTMLElement, result: AuthResult, successMessage: string) {
    if (!result.success && result.error) {
      this.handleError(element, result.error);
    } else {
      this.handleSuccess(element, successMessage);
    }
  }
}
