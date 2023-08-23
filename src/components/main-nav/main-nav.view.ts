import { ViewBuilder } from "@Interfaces/view-builder";

export default class MainNavView extends ViewBuilder {
  linksContainer: HTMLUListElement;

  constructor() {
    super();

    this.linksContainer = this.createElement("ul", {
      classes: ["d-flex", "align-items-center", "navbar-nav"],
    });
  }

  loginLinkListener(loginLinkItem: HTMLElement, handler: () => void) {
    loginLinkItem.addEventListener("click", (event) => {
      event.preventDefault();
      handler();
    });
  }

  render(...elements: HTMLElement[]) {
    this.linksContainer.append(...elements);

    return this.linksContainer;
  }
}
