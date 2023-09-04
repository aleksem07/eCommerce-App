import { Category } from "@Services/category/category.types";
import CategoryService from "@Services/category/category";
import BreadCrumbsView from "./bread-crumbs.view";

export default class BreadCrumbsComponent {
  private view: BreadCrumbsView;
  private categories?: Category[];
  private categoryService: CategoryService;

  constructor() {
    this.view = new BreadCrumbsView();
    this.categoryService = new CategoryService();
  }

  async init() {
    this.categories = await this.categoryService.getAll();

    return this.view.render(this.categories);
  }
}
