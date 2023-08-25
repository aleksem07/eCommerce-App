import "./filter.scss";
import FilterView from "./filter.view";
import FormCheckComponent from "@Components/form-check/form-check";

export default class FilterComponent {
  private view: FilterView;
  filterBrand: FormCheckComponent;
  filterSize: FormCheckComponent;
  filterColor: FormCheckComponent;

  constructor() {
    this.view = new FilterView();
    this.filterBrand = this.createFilterCheckComponent("BrandName (x)", "brand", "brand");
    this.filterSize = this.createFilterCheckComponent("Size (x)", "size", "size");
    this.filterColor = this.createFilterCheckComponent("Color", "color", "color");
  }

  private createFilterCheckComponent(labelText: string, formName: string, inputName: string) {
    return new FormCheckComponent({
      labelText,
      formName,
      inputName,
    });
  }

  init() {
    const sidebarElements: HTMLElement[] = [
      this.view.categoryBrandTitle,
      this.filterBrand.init(),
      this.view.categorySizeTitle,
      this.filterSize.init(),
      this.view.categoryColorTitle,
      this.filterColor.init(),
      this.view.categoryPriceTitle,
    ];

    return this.view.render(sidebarElements);
  }
}
