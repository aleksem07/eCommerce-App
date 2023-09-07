import { ViewBuilder } from "@Interfaces/view-builder";

export default class FooterView extends ViewBuilder {
  private element: HTMLElement;
  private container: HTMLElement;
  private buttonGoToTop: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("footer", {
      classes: ["mt-auto", "bg-dark"],
      dataset: [{ bsTheme: "dark" }],
    });
    this.container = this.createElement("div", {
      classes: ["container", "justify-content-end", "d-flex", "py-3"],
    });
    this.buttonGoToTop = this.createElement("button", {
      classes: ["btn"],
    });
    this.buttonGoToTop.textContent = "Go to top";
    this.buttonGoToTop.setAttribute("type", "button");

    this.container.append(this.buttonGoToTop);
    this.element.append(this.container);
  }

  render() {
    document.body.append(this.element);
  }
}
