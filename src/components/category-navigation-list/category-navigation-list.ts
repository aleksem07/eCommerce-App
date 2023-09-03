import { Category } from "@Services/category/category.types";
import CategoryNavigationListView from "./category-navigation-list.view";
import ItemComponent from "@Components/category-navigation-list-item/category-navigation-list-item";

export default class CategoryNavigationListComponent {
  private view: CategoryNavigationListView;
  private categoryLink?: HTMLElement;
  constructor() {
    this.view = new CategoryNavigationListView();
  }

  init(category: Category) {
    const parentLink = new ItemComponent(category.id, category.name).init();
    let childrenLinks;

    if (category.children.length > 0) {
      childrenLinks = category.children.map((child) => {
        return new ItemComponent(child.id, child.name).init(false);
      });
    }

    return this.view.render(category, parentLink, childrenLinks);
  }
}
