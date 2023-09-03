import ProductSearchView from "./product-search.view";
import FormControlComponent from "@Components/form-control/form-control";

export default class ProductSearchComponent {
  private view: ProductSearchView;
  searchInput: FormControlComponent;

  constructor() {
    this.view = new ProductSearchView();
    this.searchInput = this.createSearchInputComponent();
  }

  private createSearchInputComponent() {
    return new FormControlComponent({
      formName: "search",
      inputName: "search",
      labelText: "",
      helpText: "",
      placeholderText: "Search for products...",
      type: "text",
    });
  }

  init() {
    const searchInput = this.searchInput.init();

    return this.view.render(searchInput);
  }
}
