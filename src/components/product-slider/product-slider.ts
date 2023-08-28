import eventBusService from "@Services/event-bus/event-bus";
import ProductSliderView from "./product-slider.view";
import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { Events } from "@Services/event-bus/event-bus.types";
import { SwiperOptions } from "swiper/types/swiper-options";
import { ThumbsOptions } from "swiper/types/modules/thumbs";

export default class ProductSliderComponent {
  private view: ProductSliderView;
  swiper?: Swiper;

  constructor(images: string[], hasNavigation: boolean, thumbnail?: ThumbsOptions) {
    this.view = new ProductSliderView(images);

    eventBusService.subscribe(
      Events.renderSlider,
      this.initializeSwiper.bind(this, hasNavigation, thumbnail)
    );
  }

  initializeSwiper(hasNavigation: boolean, thumbnail?: ThumbsOptions) {
    const options: SwiperOptions = {
      modules: [Navigation, Thumbs],
      spaceBetween: 10,
    };

    if (hasNavigation) {
      options.navigation = {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      };
    }

    if (thumbnail) {
      options.thumbs = thumbnail;
    }

    this.swiper = new Swiper(this.view.swiperContainer, options);
  }

  init() {
    return this.view.render();
  }
}
