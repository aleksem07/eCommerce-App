import { Category } from "@Services/category/category.types";
import CategoryListView from "./category-list.view";
import CategoryComponent from "@Components/category/category";

export default class CategoryListComponent {
  private view: CategoryListView;
  private categoryLink?: HTMLElement;
  constructor(onChange?: (e: Event) => void) {
    this.view = new CategoryListView();
    this.view.changeListener((e: Event) => this.changeHandler(e, onChange));
  }

  changeHandler(e: Event, onChange?: (e: Event) => void) {
    if (onChange) onChange(e);
  }

  init(category: Category) {
    this.categoryLink = new CategoryComponent(category).init();

    return this.view.render(this.categoryLink, category.id);
  }
}
