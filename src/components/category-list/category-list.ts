import { Category } from "@commercetools/platform-sdk";
import CategoryListView from "./category-list.view";
import CategoryComponent from "@Components/category/category";

export default class CategoryListComponent {
  private view: CategoryListView;
  private categoriesList?: HTMLElement[];
  private categories?: Category[];
  constructor() {
    this.view = new CategoryListView();
  }

  init(categories: Category[]) {
    this.categories = categories;
    this.categoriesList = this.categories.map((category) => new CategoryComponent(category).init());

    return this.view.render(...this.categoriesList);
  }
}
