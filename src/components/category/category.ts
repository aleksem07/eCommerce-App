import CategoryView from "./category.view";

export default class CategoryComponent {
  private view: CategoryView;

  constructor(id: string, name: string) {
    this.view = new CategoryView(id, name);
  }

  init(parentComponent = true) {
    return this.view.render(parentComponent);
  }
}
