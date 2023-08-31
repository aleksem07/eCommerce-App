import CategoryComponent from "@Components/category/category";
import { ViewBuilder } from "@Interfaces/view-builder";
import { Category } from "@commercetools/platform-sdk";

export default class CategoryNavigationView extends ViewBuilder {
  private element: HTMLElement;
  linksContainer: HTMLDivElement;

  constructor() {
    super();
    this.element = this.createElement("section", {
      classes: ["d-flex-column", "container"],
    });
    this.linksContainer = this.createElement("div", {
      classes: ["d-md-flex"],
    });
  }

  addChildrensCategories(childrens: Category[]) {
    childrens.forEach((category) => {
      const categoryLink = new CategoryComponent(category).init(false);

      const parent = document.getElementById(category.ancestors[0].id);

      if (parent) parent.append(categoryLink);
    });
  }

  render(linksList: { element: HTMLElement; list: HTMLUListElement }[]) {
    linksList.map((category) => {
      this.linksContainer.append(category.element);
      this.element.append(category.list);
    });

    this.element.prepend(this.linksContainer);

    return this.element;
  }
}
