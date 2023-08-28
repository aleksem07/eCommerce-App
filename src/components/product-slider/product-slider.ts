import ProductSliderView from "./product-slider.view";

export default class ProductSliderComponent {
  private view: ProductSliderView;

  constructor(images: string[]) {
    this.view = new ProductSliderView(images);
  }

  init() {
    return this.view.render();
  }
}
