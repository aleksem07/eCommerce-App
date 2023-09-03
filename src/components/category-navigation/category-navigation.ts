import CategoryListComponent from "@Components/category-list/category-list";
import CategoryNavigationView from "./category-navigation.view";
import CategoryService from "@Services/category/category";
import { CategoryHierarchy } from "./category-navigation.types";
import ProductSearchComponent from "@Components/product-search/product-search";

export default class CategoryNavigationComponent {
  private view: CategoryNavigationView;
  private categoryService: CategoryService;
  private categories?: CategoryHierarchy;
  private parentList?: HTMLElement[];
  private searchProduct: ProductSearchComponent;

  constructor() {
    this.view = new CategoryNavigationView();
    this.categoryService = new CategoryService();
    this.searchProduct = new ProductSearchComponent();
  }

  async init() {
    const searchProduct = this.searchProduct.init();
    this.categories = await this.categoryService.getAll();

    if (this.categories?.parent) {
      this.parentList = this.categories.parent.map((category) => {
        return new CategoryListComponent().init(category);
      });
    }

    if (this.parentList) {
      this.view.render(this.parentList, searchProduct);

      if (this.categories?.children) {
        this.view.addChildrenCategories(this.categories.children);
      }
    }
  }
}
