import { Result } from "../../services/auth/auth.types";
import { Popover } from "bootstrap";

export default class Tooltip {
  constructor() {
    return;
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

  init(element: HTMLElement, result: Result, successMessage: string) {
    if (result.success) {
      this.handleSuccess(element, successMessage);
    } else {
      if (result.error) {
        this.handleError(element, result.error);
      }
    }
  }
}
