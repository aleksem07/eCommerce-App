import SortView from "./sort.view";
import FormSelectComponent from "@Components/form-select/form-select";

export default class SortComponent {
  private view: SortView;
  private sortByInput: FormSelectComponent;
  private showInput: FormSelectComponent;

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
      className: ["d-flex", "col-md-3", "h6", "text-nowrap"],
    });
  }

  private createShowInputInputComponent() {
    return new FormSelectComponent({
      formName: "filter",
      inputName: "show-products-per-page",
      labelText: "Show ",
      helpText: "products per page",
      options: [
        { label: "8", value: "8" },
        { label: "16", value: "16" },
        { label: "All", value: "32" },
      ],
      className: ["d-flex", "col-md-3", "h6", "text-nowrap"],
    });
  }

  init() {
    const toolbarElements: HTMLElement[] = [
      this.sortByInput.init(),
      this.sortByInput.init(),
      this.showInput.init(),
    ];

    return this.view.render(toolbarElements);
  }
}
