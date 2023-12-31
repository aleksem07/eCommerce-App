import CategoryListComponent from "@Components/category-navigation-list/category-navigation-list";
import CategoryNavigationView from "./category-navigation.view";
import CategoryService from "@Services/category/category";
import { Category } from "@Services/category/category.types";
import ProductSearchComponent from "@Components/product-search/product-search";

export default class CategoryNavigationComponent {
  private view: CategoryNavigationView;
  private categoryService: CategoryService;
  private categories?: Category[];
  private parentList?: HTMLElement[];
  private searchProduct: ProductSearchComponent;
  childrenList?: Category[];

  constructor() {
    this.view = new CategoryNavigationView();
    this.categoryService = new CategoryService();
    this.searchProduct = new ProductSearchComponent();
  }

  async init() {
    const searchProduct = this.searchProduct.init();
    this.categories = await this.categoryService.getAll();

    if (this.categories) {
      this.parentList = this.categories.map((category) => {
        return new CategoryListComponent().init(category);
      });
    }

    if (this.parentList) {
      this.view.render(this.parentList, searchProduct);
    }
  }
}
