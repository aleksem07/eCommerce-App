import { Result } from "./error-handler.type";
import { Popover } from "bootstrap";

export default class ErrorHandlerUtil {
  constructor() {
    return;
  }

  showPopover(content: string, duration: number) {
    const popoverContainer = document.querySelector("body");
    if (popoverContainer) {
      const popover = new Popover(popoverContainer, {
        content: content,
      });
      popover.show();

      setTimeout(() => {
        popover.dispose();
      }, duration);
    }
  }

  handleSuccess(successMessage: string) {
    this.showPopover(successMessage, 1000);
  }

  handleError(errorMessage: string) {
    this.showPopover(errorMessage, 5000);
  }

  handleResult(result: Result, successMessage?: string) {
    if (result.success) {
      this.handleSuccess(successMessage || "");
    } else {
      this.handleError(result.error || "");
    }
  }
}
