import ProductSliderView from "./product-slider.view";

export default class ProductSliderComponent {
  private view: ProductSliderView;

  constructor() {
    this.view = new ProductSliderView();
  }

  init() {
    return this.view.render();
  }
}
