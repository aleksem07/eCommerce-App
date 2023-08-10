import { ViewBuilder } from "@Interfaces/view-builder";

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
    const h1 = this.createElement("h1", { classes: ["display-1"] });
    h1.textContent = "404";

    const p = this.createElement("p", { classes: ["lead"] });
    p.textContent = "Page not found";

    const a = this.createElement<HTMLLinkElement>("a", {
      classes: ["btn", "btn-success"],
      id: "return-home-link",
    });
    a.href = "#main";
    a.textContent = "Back to home";

    this.element.append(h1, p, a);
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
