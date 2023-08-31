import CategoryListComponent from "@Components/category-list/category-list";
import CategoryNavigationView from "./category-navigation.view";
import CategoriesService from "@Services/categories/categories";
import { Category } from "@commercetools/platform-sdk";

export default class CategoryNavigationComponent {
  private view: CategoryNavigationView;
  private categoriesList: CategoryListComponent;
  // private childrenCategoriesList: CategoryListComponent;
  categoriesService: CategoriesService;
  categories?: { parent: Category[] | undefined; children: Category[] | undefined };
  private parentList?: { element: HTMLElement; list: HTMLUListElement }[];
  private childrenList?: HTMLElement;

  constructor() {
    this.categoriesList = new CategoryListComponent(this.collapseShowHandler.bind(this));
    // this.childrenCategoriesList = new CategoryListComponent();
    this.view = new CategoryNavigationView();
    this.categoriesService = new CategoriesService();
  }

  collapseShowHandler(e: Event) {
    const list = document.querySelector(".show");
    // eslint-disable-next-line no-console
    console.log("Event");

    if (list) list.classList.remove("show");
  }

  async init() {
    this.categories = await this.categoriesService.getAll();
    // eslint-disable-next-line no-console
    console.log("cat nav 1", this.categories);

    if (this.categories?.parent) {
      this.parentList = this.categories.parent.map((category) => {
        return new CategoryListComponent(this.collapseShowHandler.bind(this)).init(category);
      });
    }

    if (this.parentList) {
      // eslint-disable-next-line no-console
      console.log("cat nav 2");
      const header = document.getElementsByTagName("header");
      header[0].after(this.view.render(this.parentList));
      // header[0].after(this.view.render(this.parentList.map((category) => category.list)));

      if (this.categories?.children) {
        this.view.addChildrensCategories(this.categories.children);
      }
    }
  }
}
