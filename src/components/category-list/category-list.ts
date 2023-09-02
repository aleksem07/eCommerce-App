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
    this.categoryLink = new CategoryComponent(category).init();

    return this.view.render(this.categoryLink, category.id);
  }
}
