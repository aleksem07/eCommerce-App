import ProductSearchView from "./product-search.view";
import FormControlComponent from "@Components/form-control/form-control";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

export default class ProductSearchComponent {
  private view: ProductSearchView;
  private searchInput: FormControlComponent;
  private inputChangeTimer: NodeJS.Timeout | null = null;

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
      type: "search",
    });
  }

  private handleSearchInput(e: Event) {
    if (e.target) {
      const input = e.target as HTMLInputElement;
      const searchValue = input.value;

      if (this.inputChangeTimer !== null) {
        clearTimeout(this.inputChangeTimer);
      }

      this.inputChangeTimer = setTimeout(() => {
        eventBusService.publish(Events.searchValue, { searchValue });
      }, 500);
    }
  }

  init() {
    const searchInput = this.searchInput.init();
    searchInput.addEventListener("input", (e) => this.handleSearchInput(e));

    return this.view.render(searchInput);
  }
}
