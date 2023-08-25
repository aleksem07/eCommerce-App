import CategoriesService from "@Services/categories/categories";
import HeaderView from "./header.view";
// import { Category } from "@commercetools/platform-sdk";
// import { Category as CategoryResponse } from "@commercetools/platform-sdk";

export default class HeaderComponent {
  private view: HeaderView;
  private categoriesService: CategoriesService;

  constructor() {
    this.view = new HeaderView();
    this.categoriesService = new CategoriesService();
  }

  getCategories() {
    // const result = this.categoriesService.getAll();
    // if (result) {
    // eslint-disable-next-line no-console
    // console.log((result)[0].name);
    // }
  }

  init() {
    this.getCategories();
    this.view.render();
  }
}
