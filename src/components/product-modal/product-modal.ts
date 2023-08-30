import eventBusService from "@Services/event-bus/event-bus";
import ProductModalView from "./product-modal.view";
import { Events } from "@Services/event-bus/event-bus.types";
import { Modal } from "bootstrap";
import Swiper from "swiper";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "./product-modal.scss";

export default class ProductModalComponent {
  private view: ProductModalView;
  private modal!: HTMLElement;
  private initHandler = this.init.bind(this);

  constructor(images: string[]) {
    this.view = new ProductModalView(images);

    eventBusService.subscribe(Events.showModal, this.initHandler);
    eventBusService.subscribe(Events.urlChanged, this.urlChangeHandler.bind(this));
  }

  private initSwiper() {
    new Swiper(this.view.swiperContainer, {
      effect: "coverflow",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },

      speed: 1000,
      loop: true,
      modules: [Navigation, EffectCoverflow],
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  urlChangeHandler() {
    eventBusService.unsubscribe(Events.showModal, this.initHandler);
  }

  hideModalListener() {
    this.modal.addEventListener("hidden.bs.modal", () => {
      this.modal.remove();
    });
  }

  init() {
    this.modal = this.view.render();
    document.body.append(this.modal);
    this.initSwiper();
    Modal.getOrCreateInstance(this.modal).show();

    this.hideModalListener();
  }
}
