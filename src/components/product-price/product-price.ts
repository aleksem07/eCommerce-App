import ProductPriceView from "./product-price.view";
import { ProductPriceProps } from "./product-price.types";

export default class ProductPriceComponent {
  private view: ProductPriceView;

  constructor({ price, discountedPrice, size = "sm", classes }: ProductPriceProps) {
    this.view = new ProductPriceView({ price, discountedPrice, size, classes });
  }

  init() {
    return this.view.render();
  }
}
