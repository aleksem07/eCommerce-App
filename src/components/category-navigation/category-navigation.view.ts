import CategoryComponent from "@Components/category/category";
import { ViewBuilder } from "@Interfaces/view-builder";
import { Category } from "@commercetools/platform-sdk";
import { Routes } from "@Services/router/router.types";

export default class CategoryNavigationView extends ViewBuilder {
  private container: HTMLDivElement;
  private linksContainer: HTMLDivElement;
  private nav: HTMLElement;
  private wrapper: HTMLElement;
  private categoriesLists?: HTMLElement[] = [];

  constructor() {
    super();
    this.nav = this.createElement("nav", {
      classes: ["bg-body-tertiary", "navbar", "navbar-expand"],
    });
    this.container = this.createElement("div", {
      classes: ["container", "justify-content-start"],
    });
    this.wrapper = this.createElement("div", {
      classes: ["d-flex-column"],
    });
    this.linksContainer = this.createElement("div", {
      classes: ["d-md-flex"],
    });
    const brandLink = this.createBrandLink();
    this.nav.append(brandLink);
  }

  addChildrensCategories(childrens: Category[]) {
    childrens.forEach((category) => {
      const categoryLink = new CategoryComponent(category).init(false);

      const parent = document.getElementById(category.ancestors[0].id);

      if (parent) parent.append(categoryLink);
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

  render(linksList: { element: HTMLElement; list: HTMLUListElement }[]) {
    linksList.map((category) => {
      this.linksContainer.append(category.element);
      this.categoriesLists?.push(category.list);
      console.log("55", this.categoriesLists);
      // this.nav.append(category.list);
    });

    this.wrapper.prepend(this.linksContainer);
    this.container.append(this.wrapper);

    this.nav.append(this.container);

    const header = document.getElementsByTagName("header");

    if (this.categoriesLists) header[0].after(this.nav, ...this.categoriesLists);
    // return this.nav;
  }
}
