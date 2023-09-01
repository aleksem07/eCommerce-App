import { Category } from "@Services/category/category.types";
import CategoryView from "./category.view";

export default class CategoryComponent {
  private view: CategoryView;

  constructor({ id, name, ancestors }: Category) {
    this.view = new CategoryView({
      id,
      name,
      ancestors,
    });
  }

  init(parentComponent = true) {
    return this.view.render(parentComponent);
  }
}
