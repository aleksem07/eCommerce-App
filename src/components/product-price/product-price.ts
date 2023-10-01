import ProductPriceView from "./product-price.view";
import { ProductPriceProps } from "./product-price.types";

export default class ProductPriceComponent {
  private view: ProductPriceView;

  constructor({ price, discountedPrice, size = "sm" }: ProductPriceProps) {
    this.view = new ProductPriceView({ price, discountedPrice, size });
  }

  init() {
    return this.view.render();
  }
}
