import SortView from "./sort.view";
import FormSelectComponent from "@Components/form-select/form-select";

export default class SortComponent {
  private view: SortView;
  sortByInput: FormSelectComponent;
  showInput: FormSelectComponent;

  constructor() {
    this.view = new SortView();
    this.sortByInput = this.createSortByInputInputComponent();
    this.showInput = this.createShowInputInputComponent();
  }

  private createSortByInputInputComponent() {
    return new FormSelectComponent({
      formName: "filter",
      inputName: "sort-by",
      labelText: "Sort by",
      helpText: "",
      options: [
        { label: "default", value: "*" },
        { label: "price", value: "price" },
        { label: "name", value: "name" },
      ],
      className: "d-flex",
    });
  }

  private createShowInputInputComponent() {
    return new FormSelectComponent({
      formName: "filter",
      inputName: "show-products-per-page",
      labelText: "Show products per page",
      helpText: "",
      options: [
        { label: "16", value: "16" },
        { label: "32", value: "32" },
        { label: "All", value: "32" },
      ],
      className: "d-flex",
    });
  }

  init() {
    const toolbarElements: HTMLElement[] = [
      this.sortByInput.init(),
      this.sortByInput.init(),
      this.showInput.init(),
      this.view.pagination,
    ];

    return this.view.render(toolbarElements);
  }
}
