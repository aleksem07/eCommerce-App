import { Popover } from "bootstrap";

export default class TooltipComponent {
  private element?: HTMLElement;
  private popover?: Popover;

  duration = 3000;

  show(title: string, content: string) {
    let popoverElement = document.querySelector(".popover");

    if (popoverElement) popoverElement.remove();

    this.showPop(title, content);
    setTimeout(() => {
      popoverElement = document.querySelector(".popover");

      if (popoverElement) popoverElement.remove();
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
