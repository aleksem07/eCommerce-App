import { ViewBuilder } from "@Interfaces/view-builder";

export default class AboutUsView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      id: "about-us",
      classes: ["container", "g-0"],
    });
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
