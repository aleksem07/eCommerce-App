import CategoryNavigationListItemView from "./category-navigation-list-item.view";

export default class CategoryNavigationListItemComponent {
  private view: CategoryNavigationListItemView;

  constructor(id: string, name: string) {
    this.view = new CategoryNavigationListItemView(id, name);
  }

  init(parentComponent = true) {
    return this.view.render(parentComponent);
  }
}
