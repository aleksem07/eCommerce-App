import SortView from "./sort.view";
import FormSelectComponent from "@Components/form-select/form-select";

export default class SortComponent {
  private view: SortView;
  private sortByInput: FormSelectComponent;

  constructor() {
    this.view = new SortView();
    this.sortByInput = this.createSortByInputComponent();
  }

  private createSortByInputComponent() {
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
      classes: ["d-flex", "align-items-center", "gap-3", "col-md-3", "h6", "text-nowrap"],
    });
  }

  init() {
    return this.view.render(this.sortByInput.init());
  }
}
