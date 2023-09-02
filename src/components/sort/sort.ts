import "./sort.scss";
import SortView from "./sort.view";
import FormSelectComponent from "@Components/form-select/form-select";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

export default class SortComponent {
  private view: SortView;
  private sortByInput: FormSelectComponent;

  constructor() {
    this.view = new SortView();
    this.sortByInput = this.createSortByInputComponent();

    const sortByInput = this.sortByInput.init();
    sortByInput.addEventListener("change", (e) => this.handleSortSelectChange(e));
  }

  private createSortByInputComponent() {
    return new FormSelectComponent({
      formName: "filter",
      inputName: "sort-by",
      labelText: "Sort by",
      helpText: "",
      options: [
        { label: "default", value: "createdAt asc" },
        { label: "price low to high", value: "price asc" },
        { label: "price high to low", value: "price desc" },
        { label: "name", value: "name.en asc" },
      ],
      classes: ["d-flex", "align-items-center", "gap-3", "col-md-4", "h6", "text-nowrap"],
    });
  }

  private handleSortSelectChange(e: Event) {
    if (e.target) {
      const selectValue = (e.target as HTMLSelectElement).value;

      if (selectValue) {
        eventBusService.publish(Events.sortProducts, { selectValue });
      }
    }
  }

  init() {
    return this.view.render(this.sortByInput.init());
  }
}
