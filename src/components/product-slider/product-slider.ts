import eventBusService from "@Services/event-bus/event-bus";
import ProductSliderView from "./product-slider.view";
import Swiper from "swiper";
import { EffectCoverflow, Navigation, Thumbs } from "swiper/modules";
import { Events } from "@Services/event-bus/event-bus.types";
import "./product-slider.scss";

export default class ProductSliderComponent {
  private view: ProductSliderView;

  constructor(images: string[]) {
    this.view = new ProductSliderView(images);

    eventBusService.subscribe(Events.renderProductSlider, this.initializeSwiper.bind(this));
    this.view.swiperSlideListener(this.swiperSlideHandler.bind(this));
  }

  swiperSlideHandler(index: string) {
    eventBusService.publish(Events.showModal, { index });
  }

  get thumbsContainer(): HTMLDivElement {
    return this.view.thumbsContainer;
  }

  get imageContainer(): HTMLDivElement {
    return this.view.imageContainer;
  }

  initializeSwiper() {
    const thumbnailSwiper = new Swiper(this.view.thumbsContainer, {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper(this.view.imageContainer, {
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
      modules: [Navigation, Thumbs, EffectCoverflow],
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: thumbnailSwiper,
      },
    });
  }

  init() {
    return this.view.render();
  }
}
