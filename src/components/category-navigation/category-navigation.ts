import CategoryListComponent from "@Components/category-list/category-list";
import CategoryNavigationView from "./category-navigation.view";
import CategoriesService from "@Services/categories/categories";
import { Category } from "@commercetools/platform-sdk";

export default class CategoryNavigationComponent {
  private view: CategoryNavigationView;
  private cateriesList: CategoryListComponent;
  categoriesService: CategoriesService;
  categories?: { parent: Category[] | undefined; children: Category[] | undefined };
  private parentList?: HTMLElement;

  constructor() {
    this.cateriesList = new CategoryListComponent();
    this.view = new CategoryNavigationView();
    this.categoriesService = new CategoriesService();
  }

  async init() {
    this.categories = await this.categoriesService.getAll();
    // eslint-disable-next-line no-console
    console.log("cat nav 1", this.categories);

    if (this.categories?.parent) this.parentList = this.cateriesList.init(this.categories.parent);

    if (this.parentList) {
      // eslint-disable-next-line no-console
      console.log("cat nav 2");
      const header = document.getElementsByTagName("header");
      header[0].after(this.view.render(this.parentList));
    }
  }
}
