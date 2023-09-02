import CategoryListComponent from "@Components/category-list/category-list";
import CategoryNavigationView from "./category-navigation.view";
import CategoryService from "@Services/category/category";
import { CategoryHierarchy } from "./category-navigation.types";

export default class CategoryNavigationComponent {
  private view: CategoryNavigationView;
  private categoryService: CategoryService;
  private categories?: CategoryHierarchy;
  private parentList?: HTMLElement[];

  constructor() {
    this.view = new CategoryNavigationView();
    this.categoryService = new CategoryService();
  }

  async init() {
    this.categories = await this.categoryService.getAll();

    if (this.categories?.parent) {
      this.parentList = this.categories.parent.map((category) => {
        return new CategoryListComponent().init(category);
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
