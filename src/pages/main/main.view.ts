import { ViewBuilder } from "@Interfaces/view-builder";

export default class MainView extends ViewBuilder {
  container: HTMLElement;
  heading: HTMLHeadingElement;
  promoCode: HTMLElement;
  constructor() {
    super();
    this.container = this.createElement("div", {
      id: "main",
      classes: ["container"],
    });
    this.heading = this.createElement("h1", {
      id: "main-heading",
      classes: ["h3", "mb-3", "fw-normal", "text-center", "py-5"],
    });
    this.heading.textContent = "Main Page";
    this.promoCode = this.createElement("h2", {
      classes: ["h3", "mb-3", "fw-normal", "text-center", "py-5"],
    });
    this.promoCode.textContent = 'Promo Code: "off10"';

    this.container.append(this.heading, this.promoCode);
  }

  render() {
    this.appendTo("#root", this.container);
  }
}
