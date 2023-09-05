import { ProductExtraDescriptionProps } from "./product-extra-description.types";
import ProductExtraDescriptionView from "./product-extra-description.view";

export default class ProductExtraDescriptionComponent {
  private view: ProductExtraDescriptionView;

  constructor({ title, content, list }: ProductExtraDescriptionProps) {
    this.view = new ProductExtraDescriptionView({ title, content, list });
  }

  init() {
    return this.view.render();
  }
}
