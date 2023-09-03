import { Category } from "@Services/category/category.types";
import CategoryListView from "./category-list.view";
import CategoryComponent from "@Components/category/category";

export default class CategoryListComponent {
  private view: CategoryListView;
  private categoryLink?: HTMLElement;
  constructor() {
    this.view = new CategoryListView();
  }

  init(category: Category) {
    const parentLink = new CategoryComponent(category.id, category.name).init();
    const childrenLinks = category.children.map((child) => {
      return new CategoryComponent(child.id, child.name).init(false);
    });

    return this.view.render(parentLink, childrenLinks, category);
  }
}
