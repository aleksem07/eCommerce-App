import ProductPriceComponent from "@Components/product-price/product-price";
import { ProductCardProps } from "./product-card.types";
import ProductCardView from "./product-card.view";
import "./product-card.scss";

export default class ProductCardComponent {
  private view: ProductCardView;
  private price: ProductPriceComponent;

  constructor({ title, description, imageUrl, price, discountedPrice, id }: ProductCardProps) {
    this.view = new ProductCardView({ title, description, imageUrl, price, id });
    this.price = new ProductPriceComponent(price, discountedPrice);
  }

  init() {
    const priceElement = this.price.init();

    return this.view.render(priceElement);
  }
}
