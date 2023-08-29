import { Category } from "@commercetools/platform-sdk";
import CategoryView from "./category.view";

export default class CategoryComponent {
  private view: CategoryView;

  constructor({
    id,
    name,
    version,
    createdAt,
    lastModifiedAt,
    slug,
    createdBy,
    ancestors,
    orderHint,
  }: Category) {
    this.view = new CategoryView({
      id,
      name,
      version,
      createdAt,
      lastModifiedAt,
      slug,
      createdBy,
      ancestors,
      orderHint,
    });
  }

  init() {
    return this.view.render();
  }
}
