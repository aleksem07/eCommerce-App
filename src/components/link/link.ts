import { LinkProps } from "./link.types";
import LinkView from "./link.view";

export default class LinkComponent {
  private view: LinkView;

  constructor({ href, text, classes, clickHandler }: LinkProps) {
    this.view = new LinkView({
      href,
      text,
      classes,
      clickHandler,
    });

    if (clickHandler) {
      this.view.clickListener(clickHandler);
    }
  }

  init() {
    return this.view.render();
  }
}
