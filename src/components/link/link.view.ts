import { ViewBuilder } from "@Interfaces/view-builder";
import { LinkProps } from "./link.types";

export default class LinkView extends ViewBuilder {
  private element: HTMLLinkElement;

  constructor({ href, text, classes }: LinkProps) {
    super();
    this.element = this.createElement<HTMLLinkElement>("a", {
      classes,
    });
    this.element.href = href;
    this.element.textContent = text;
  }

  clickListener(handler: () => void) {
    this.element.addEventListener("click", (event) => {
      event.preventDefault();
      handler();
    });
  }

  render() {
    return this.element;
  }
}
