import ProductCardComponent from "@Components/product-card/product-card";
import ProductListView from "./product-list.view";

export default class ProductListComponent {
  private view: ProductListView;
  productCardComponent: ProductCardComponent;

  constructor() {
    this.view = new ProductListView();
    this.productCardComponent = new ProductCardComponent({
      title: "title",
      description: "description",
      imageUrl: "imageUrl",
    });
  }

  init() {
    const card = this.productCardComponent.init();

    return this.view.render(card);
  }
}
