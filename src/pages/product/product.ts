import ProductInformationComponent from "@Components/product-information/product-information";
import ProductView from "./product.view";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { NotificationVariant } from "@Components/notification/notification.types";

export default class ProductPage {
  private view: ProductView;
  private information: ProductInformationComponent;
  private id?: string;

  constructor() {
    this.view = new ProductView();
    this.information = new ProductInformationComponent({
      title: "Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "URL",
      price: { currencyCode: "USD", value: 100 },
      id: "test",
    });
  }

  init() {
    this.checkProductExists();

    const information = this.information.init();
    this.view.render(information);
  }

  private checkProductExists() {
    const [, ...rest] = window.location.href.split("-");
    this.id = rest.join("-");

    if (!this.id) {
      RouterService.navigateTo(Routes.NOT_FOUND);
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.info,
        message: "Product not found",
      });
    }
  }
}
