import CategoryComponent from "@Components/category/category";
import { ViewBuilder } from "@Interfaces/view-builder";
import { Category } from "@Services/category/category.types";
import { Routes } from "@Services/router/router.types";

export default class CategoryNavigationView extends ViewBuilder {
  private container: HTMLDivElement;
  private linksContainer: HTMLDivElement;
  private searchContainer: HTMLDivElement;
  private nav: HTMLElement;
  private wrapper: HTMLElement;

  constructor() {
    super();
    this.nav = this.createElement("nav", {
      classes: ["bg-body-tertiary", "navbar", "navbar-expand"],
    });
    this.container = this.createElement("div", {
      classes: ["container", "justify-content-space-between"],
    });
    this.wrapper = this.createElement("div", {
      classes: ["d-flex-column", "flex-grow-1"],
    });
    this.linksContainer = this.createElement("div", {
      classes: ["d-md-flex"],
    });
    this.searchContainer = this.createElement("div", {
      classes: ["d-md-flex"],
    });
    const brandLink = this.createBrandLink();
    this.container.append(brandLink);
  }

  addChildrenCategories(children: Category[]) {
    children.forEach((category) => {
      const categoryLink = new CategoryComponent(category).init(false);

      const parent = document.getElementById(category.ancestors[0].id);

      if (parent) {
        parent.append(categoryLink);
      }
    });
  }

  private createBrandLink(): HTMLLinkElement {
    const link = this.createElement<HTMLLinkElement>("a", {
      classes: ["navbar-brand", "px-2"],
    });
    link.href = Routes.MAIN;
    link.textContent = "Fishing Hub";

    return link;
  }

  render(linksList: HTMLElement[], searchProduct: HTMLElement) {
    linksList.map((category) => {
      this.linksContainer.append(category);
    });
    this.wrapper.prepend(this.linksContainer);
    this.searchContainer.append(searchProduct);
    this.container.append(this.wrapper);
    this.container.append(this.searchContainer);

    this.nav.append(this.container);

    const header = document.getElementsByTagName("header");

    header[0].after(this.nav);
  }
}