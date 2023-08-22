import NavbarComponent from "@Components/navbar/navbar";
import { ViewBuilder } from "@Interfaces/view-builder";

export default class HeaderView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("header", {
      classes: ["container-fluid", "bg-dark"],
      dataset: [{ bsTheme: "dark" }],
    });
  }

  render() {
    document.body.prepend(this.element);
    new NavbarComponent().init();
  }
}
