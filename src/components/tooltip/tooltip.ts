import { Popover } from "bootstrap";

export default class TooltipComponent {
  private element?: HTMLElement;
  private popover?: Popover;

  duration = 3000;

  show(title: string, content: string) {
    if (this.element) {
      this.popover = new Popover(this.element, {
        title,
        content,
      });
      this.popover.show();
      this.hide();
    }
  }

  hide() {
    setTimeout(() => {
      this.popover?.dispose();
    }, this.duration);
  }

  init(element: HTMLElement) {
    this.element = element;
  }
}
