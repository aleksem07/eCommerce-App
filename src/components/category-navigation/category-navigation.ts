import CategoryListComponent from "@Components/category-list/category-list";
import CategoryNavigationView from "./category-navigation.view";
import CategoryService from "@Services/category/category";
import { Category } from "@Services/category/category.types";

export default class CategoryNavigationComponent {
  private view: CategoryNavigationView;
  private categoriesList: CategoryListComponent;
  categoryService: CategoryService;
  categories?: { parent: Category[] | undefined; children: Category[] | undefined };
  private parentList?: { element: HTMLElement; list: HTMLUListElement }[];

  constructor() {
    this.categoriesList = new CategoryListComponent(this.collapseShowHandler.bind(this));
    this.view = new CategoryNavigationView();
    this.categoryService = new CategoryService();
  }

  collapseShowHandler() {
    const list = document.querySelector(".show");

    if (list) list.classList.remove("show");
  }

  async init() {
    this.categories = await this.categoryService.getAll();

    if (this.categories?.parent) {
      this.parentList = this.categories.parent.map((category) => {
        return new CategoryListComponent(this.collapseShowHandler.bind(this)).init(category);
      });
    }

    if (this.parentList) {
      this.view.render(this.parentList);

      if (this.categories?.children) {
        this.view.addChildrenCategories(this.categories.children);
      }
    }
  }
}
