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

  render(sidebarElements: HTMLElement[]) {
    this.sidebar.append(this.hideSidebarButton, ...sidebarElements);

    return this.sidebar;
  }
}
