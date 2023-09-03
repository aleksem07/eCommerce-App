import CategoryListComponent from "@Components/category-list/category-list";
import CategoryNavigationView from "./category-navigation.view";
import CategoryService from "@Services/category/category";
import { Category } from "@Services/category/category.types";
// import { CategoryHierarchy } from "./category-navigation.types";

export default class CategoryNavigationComponent {
  private view: CategoryNavigationView;
  private categoryService: CategoryService;
  private categories?: Category[];
  private parentList?: HTMLElement[];
  childrenList?: Category[];

  constructor() {
    this.view = new CategoryNavigationView();
    this.categoryService = new CategoryService();
  }

  async init() {
    this.categories = await this.categoryService.getAll();

    if (this.categories) {
      this.parentList = this.categories.map((category) => {
        return new CategoryListComponent().init(category);
      });
    }

    if (this.parentList) {
      this.view.render(this.parentList);
    }
  }
}
