import ProductInformationComponent from "@Components/product-information/product-information";
import ProductView from "./product.view";

export default class ProductPage {
  private view: ProductView;
  private information: ProductInformationComponent;

  constructor() {
    this.view = new ProductView();
    this.information = new ProductInformationComponent({
      title: "test",
      description: "test",
      imageUrl: "test",
      price: { currencyCode: "USD", value: 100 },
      id: "test",
    });
  }

  init() {
    const information = this.information.init();
    this.view.render(information);
  }
}
