import { ViewBuilder } from "@Interfaces/view-builder";

export default class FooterView extends ViewBuilder {
  private element: HTMLElement;
  private container: HTMLElement;
  private copyright: HTMLElement;
  private buttonGoToTop: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("footer", {
      classes: ["mt-auto", "bg-dark"],
      dataset: [{ bsTheme: "dark" }],
    });
    this.container = this.createElement("div", {
      classes: [
        "container",
        "justify-content-between",
        "d-flex",
        "py-3",
        "align-items-center",
        "g-0",
      ],
    });
    this.copyright = this.createElement("p", {
      classes: ["text-white", "mb-0", "align-content-center"],
    });
    this.copyright.textContent = "© All rights reserved. Made with ❤ by Random Team #19";
    this.buttonGoToTop = this.createElement("button", {
      classes: ["btn", "text-white"],
    });
    this.buttonGoToTop.setAttribute("type", "button");
    this.buttonGoToTop.textContent = "Go to top";

    this.container.append(this.copyright, this.buttonGoToTop);
    this.element.append(this.container);
  }

  render() {
    document.body.append(this.element);
  }
}
