import ProductInformationComponent from "@Components/product-information/product-information";
import ProductView from "./product.view";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { NotificationVariant } from "@Components/notification/notification.types";
import ProductService from "@Services/product/product";
import { Product } from "@Services/product/product.types";

export default class ProductPage {
  private view: ProductView;
  private information?: ProductInformationComponent;
  private productService: ProductService;
  private id?: string;
  private product?: Product;

  constructor() {
    this.productService = new ProductService();

    this.view = new ProductView();
  }

  private displayProduct() {
    if (this.product) {
      this.information = new ProductInformationComponent(this.product);
      this.view.render(this.information.init());
    }
  }

  private async checkProductExists() {
    const [, ...rest] = window.location.href.split("-");
    this.id = rest.join("-");

    if (!this.id) {
      RouterService.navigateTo(Routes.NOT_FOUND);
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.info,
        message: "Product not found",
      });
    } else {
      const product = await this.productService.getById(this.id);

      if (product) {
        this.product = product;
      } else {
        RouterService.navigateTo(Routes.NOT_FOUND);
      }
    }
  }

  async init() {
    await this.checkProductExists();
    this.displayProduct();
  }
}
