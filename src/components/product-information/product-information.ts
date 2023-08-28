import ProductInformationView from "./product-information.view";
// eslint-disable-next-line max-len
import ProductExtraDescriptionComponent from "@Components/product-extra-description/product-extra-description";
import { ProductInformationProps } from "./product-information.types";
import ProductPriceComponent from "@Components/product-price/product-price";
import ProductSliderComponent from "@Components/product-slider/product-slider";

export default class ProductInformationComponent {
  private view: ProductInformationView;
  private deliveryDetails: ProductExtraDescriptionComponent;
  private returnDetails: ProductExtraDescriptionComponent;
  private prices: ProductPriceComponent;
  private slider: ProductSliderComponent;

  constructor({
    title,
    description,
    images: images,
    price,
    id,
    discountedPrice,
  }: ProductInformationProps) {
    this.view = new ProductInformationView({ title, description, images, price, id });
    this.deliveryDetails = new ProductExtraDescriptionComponent({
      title: "Delivery",
      content: "Free standard shipping on orders over $35 before tax, plus free returns.",
      list: ["Standard delivery - $5", "Express delivery - $10", "Pick up in store - free"],
    });
    this.returnDetails = new ProductExtraDescriptionComponent({
      title: "Return",
      content: "You have 60 days to return the item(s) using any of the following methods:",
      list: ["Free store return", "Free returns via USPS Dropoff Service"],
    });
    this.prices = new ProductPriceComponent({ price, discountedPrice, size: "md" });

    this.slider = new ProductSliderComponent(images);
  }

  init() {
    return this.view.render({
      deliveryDetails: this.deliveryDetails.init(),
      returnDetails: this.returnDetails.init(),
      price: this.prices.init(),
      slider: this.slider.init(),
    });
  }
}
