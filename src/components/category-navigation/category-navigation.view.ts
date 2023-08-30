import CategoryComponent from "@Components/category/category";
import { ViewBuilder } from "@Interfaces/view-builder";
import { Category } from "@commercetools/platform-sdk";

export default class CategoryNavigationView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("section", {
      classes: ["container-fluid"],
    });
  }

  addChildrensCategories(childrens: Category[]) {
    childrens.forEach((category) => {
      const categoryLink = new CategoryComponent(category).init(false);

      const parent = document.getElementById(category.ancestors[0].id);
      // eslint-disable-next-line no-console
      console.log("addchildrens", categoryLink, parent);

      if (parent) parent.append(categoryLink);
    });
  }

  render(linksList: HTMLElement[]) {
    this.element.append(...linksList);

    return this.element;
  }
}
