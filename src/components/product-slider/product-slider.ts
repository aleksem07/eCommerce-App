import eventBusService from "@Services/event-bus/event-bus";
import ProductSliderView from "./product-slider.view";
import Swiper from "swiper";
import { EffectCoverflow, Navigation, Thumbs } from "swiper/modules";
import { Events } from "@Services/event-bus/event-bus.types";
import "./product-slider.scss";
import ProductModalComponent from "@Components/product-modal/product-modal";

export default class ProductSliderComponent {
  private view: ProductSliderView;
  private modal: ProductModalComponent;

  constructor(images: string[]) {
    this.view = new ProductSliderView(images);
    this.modal = new ProductModalComponent();

    eventBusService.subscribe(Events.renderSlider, this.initializeSwiper.bind(this));
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
