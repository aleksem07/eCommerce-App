import { Result } from "../../services/auth/auth.types";
import { Popover } from "bootstrap";

export default class Tooltip {
  popoverContainer: HTMLElement;

  constructor(tagName = "body") {
    this.popoverContainer = document.querySelector(`${tagName}`) as HTMLElement;
  }

  showPopover(title: string, content: string, duration: number) {
    const popover = new Popover(this.popoverContainer, {
      title: title,
      content: content,
    });
    popover.show();

    setTimeout(() => {
      popover.dispose();
    }, duration);
  }

  handleSuccess(successMessage: string) {
    this.showPopover("Success", successMessage, 1500);
  }

  handleError(errorMessage: string) {
    this.showPopover("Error", errorMessage, 3500);
  }

  init(result: Result, successMessage?: string) {
    if (result.success) {
      this.handleSuccess(successMessage || "");
    } else {
      this.handleError(result.error || "");
    }
  }
}
