import CategoriesService from "@Services/categories/categories";
import CatalogView from "./catalog.view";

export default class CatalogComponent {
  private view: CatalogView;
  private categoriesService: CategoriesService;

  constructor() {
    this.view = new CatalogView();
    this.categoriesService = new CategoriesService();
  }

  getCategories() {
    const result = this.categoriesService.getAll();

    if (result) {
      // eslint-disable-next-line no-console
      console.log(result);
    }
  }

  init() {
    this.getCategories();

    return this.view.render();
  }
}
