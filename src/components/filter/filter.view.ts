import { ViewBuilder } from "@Interfaces/view-builder";

export default class FilterView extends ViewBuilder {
  private sidebar: HTMLElement;
  hideSidebarButton: HTMLElement;
  categoryBrandTitle: HTMLHeadingElement;
  categorySizeTitle: HTMLHeadingElement;
  categoryColorTitle: HTMLHeadingElement;
  categoryPriceTitle: HTMLHeadingElement;

  constructor() {
    super();
    this.sidebar = this.createElement("div", {
      classes: ["sidebar", "row"],
    });
    this.hideSidebarButton = this.createElement("button", {
      classes: ["btn", "btn-dark"],
    });
    this.hideSidebarButton.setAttribute("type", "button");
    this.hideSidebarButton.textContent = "Reset filters";

    this.categoryBrandTitle = this.createElement("h2", {
      id: `category-brand-title`,
      classes: ["h4", "fw-normal", "text-left", "py-3"],
    });
    this.categoryBrandTitle.textContent = `Brand`;
    this.categorySizeTitle = this.createElement("h2", {
      id: `category-size-title`,
      classes: ["h4", "fw-normal", "text-left", "py-3"],
    });
    this.categorySizeTitle.textContent = `Size`;
    this.categoryColorTitle = this.createElement("h2", {
      id: `category-color-title`,
      classes: ["h4", "fw-normal", "text-left", "py-3"],
    });
    this.categoryColorTitle.textContent = `Color`;
    this.categoryPriceTitle = this.createElement("h2", {
      id: `category-price-title`,
      classes: ["h4", "fw-normal", "text-left", "py-3"],
    });
    this.categoryPriceTitle.textContent = `Price`;
  }

  createColorDiv(color?: string): HTMLElement {
    const container = this.createElement("div", {
      classes: ["col-md-3", "mb-4"],
    });
    const div = this.createElement("div", {
      classes: ["d-flex", "rounded-circle", "align-items-center", "justify-content-center", "mt-2"],
    });

    const title = this.createElement("p", {
      classes: ["mt-2"],
    });

    if (color) {
      div.style.backgroundColor = color;
      title.textContent = color[0].toUpperCase() + color.slice(1);
    }

    if (color == "multicolored") {
      div.style.background = "linear-gradient(45deg, red 30%, yellow 50%, blue 70%)";
      title.textContent = "Multi";
    }
    div.style.outline = "1px solid black";
    div.style.outlineOffset = "3px";
    div.style.width = "30px";
    div.style.height = "30px";
    div.style.cursor = "pointer";
    container.append(div, title);

    return container;
  }

  render(sidebarElements: HTMLElement[]) {
    this.sidebar.append(this.hideSidebarButton, ...sidebarElements);

    return this.sidebar;
  }
}
