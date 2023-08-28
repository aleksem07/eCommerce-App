import eventBusService from "@Services/event-bus/event-bus";
import ProductSliderView from "./product-slider.view";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import { Events } from "@Services/event-bus/event-bus.types";

export default class ProductSliderComponent {
  private view: ProductSliderView;

  constructor(images: string[]) {
    this.view = new ProductSliderView(images);

    eventBusService.subscribe(Events.renderSlider, this.initializeSwiper.bind(this));
  }

  initializeSwiper() {
    new Swiper(this.view.swiperContainer, {
      modules: [Navigation],
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // thumbs: {
      //   swiper,
      // },
    });
  }

  init() {
    return this.view.render();
  }
}
