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
      inputName: "sortBy",
      labelText: "Sort by",
      helpText: "",
      options: [
        { label: "default", value: "*" },
        { label: "popularity", value: "popularity" },
        { label: "name", value: "name" },
      ],
    });
  }

  private createShowInputInputComponent() {
    return new FormSelectComponent({
      formName: "filter",
      inputName: "Show",
      labelText: "Show products per page",
      helpText: "",
      options: [
        { label: "10", value: "10" },
        { label: "11", value: "11" },
      ],
    });
  }

  init() {
    const toolbarElements: HTMLElement[] = [
      this.sortByInput.init(),
      this.showInput.init(),
      this.view.pagination,
    ];

    return this.view.render(toolbarElements);
  }
}
