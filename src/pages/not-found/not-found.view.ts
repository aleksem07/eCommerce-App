import { ViewBuilder } from "@Interfaces/view-builder";
import notFoundImage from "assets/images/404-image.png";

export default class NotFoundView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      id: "not-found",
      classes: ["d-flex", "justify-content-center", "align-items-center", "flex-column", "vh-100"],
    });

    this.renderLayout();
  }

  private renderLayout() {
    const image = this.createElement<HTMLImageElement>("img", {
      classes: ["w-50"],
    });
    image.src = notFoundImage;
    image.alt = "404";
    image.style.maxWidth = "500px";

    const h1 = this.createElement("h1", { classes: ["display-4"] });
    h1.textContent = "Page not found";

    const a = this.createElement<HTMLLinkElement>("a", {
      classes: ["btn", "btn-primary"],
      id: "return-home-link",
    });
    a.href = "#main";
    a.textContent = "Back to home";

    this.element.append(image, h1, a);
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
