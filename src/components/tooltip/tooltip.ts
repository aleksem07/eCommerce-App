import { Popover } from "bootstrap";

export default class TooltipComponent {
  private element?: HTMLElement;
  private popover?: Popover;

  timeout: NodeJS.Timeout | null = null;
  duration = 3000;

  show(title: string, content: string) {
    const popoverElement = document.querySelector(".popover");

    if (popoverElement) {
      popoverElement.remove();
    }

    this.showPop(title, content);
    this.hide();
  }

  hide() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      const popoverElement = document.querySelector(".popover");

      if (popoverElement) {
        popoverElement.remove();
      }
    }, this.duration);
  }

  showPop(title: string, content: string) {
    if (this.element) {
      this.popover = new Popover(this.element, {
        title,
        content,
      });
      this.popover.show();
    }
  }

  init(element: HTMLElement) {
    this.element = element;
  }
}
