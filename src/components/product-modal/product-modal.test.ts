import eventBusService from "@Services/event-bus/event-bus";
import ProductModalComponent from "./product-modal";
import { Events } from "@Services/event-bus/event-bus.types";
import Swiper from "swiper";

describe("ProductModalComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductModalComponent(["test"]);
    expect(instance).toBeInstanceOf(ProductModalComponent);
  });

  it("should render modal", () => {
    new ProductModalComponent(["test"]);

    eventBusService.publish(Events.showModal);

    const modal = document.getElementById("product-modal");
    expect(modal).toBeDefined();
  });

  it("should render swiper", () => {
    new ProductModalComponent(["test"]);

    eventBusService.publish(Events.showModal);

    expect(Swiper).toHaveBeenCalled();
  });

  it("should slide to second image", () => {
    const instance = new ProductModalComponent(["test"]);

    eventBusService.publish(Events.showModal, { index: "1" });

    expect(instance.swiper.slideTo).toHaveBeenCalledWith(1);
  });

  it("should unsubscribe from event", () => {
    const eventBusServiceSpy = jest.spyOn(eventBusService, "unsubscribe");
    new ProductModalComponent(["test"]);

    eventBusService.publish(Events.urlChanged);

    expect(eventBusServiceSpy).toHaveBeenCalled();
  });
});
