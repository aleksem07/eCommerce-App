import { ViewBuilder } from "@Interfaces/view-builder";
import Swiper from "swiper";

export default class ProductSliderView extends ViewBuilder {
  private swiperContainer: HTMLDivElement;
  private swiperWrapper: HTMLDivElement;
  private swiper: Swiper | null = null;
  private images: string[] = [];

  constructor(images: string[]) {
    super();
    this.images = images;
    this.swiperContainer = this.createSwiperContainer();
    this.swiperWrapper = this.createSwiperWrapper();
  }

  createSwiperContainer(): HTMLDivElement {
    const container = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper-container"],
    });

    return container;
  }

  createSwiperWrapper(): HTMLDivElement {
    const wrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper-wrapper"],
    });

    return wrapper;
  }

  createSwiperSlide(imageUrl: string): HTMLDivElement {
    const slide = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper-slide"],
    });
    const img = this.createElement<HTMLImageElement>("img");
    img.src = imageUrl;
    slide.appendChild(img);

    return slide;
  }

  render(): HTMLElement {
    this.swiperWrapper.innerHTML = "";

    this.images.forEach((imageUrl) => {
      const slide = this.createSwiperSlide(imageUrl);
      this.swiperWrapper.appendChild(slide);
    });

    this.swiperContainer.appendChild(this.swiperWrapper);

    if (!this.swiper) {
      this.swiper = new Swiper(".swiper-container");
    } else {
      this.swiper.update();
    }

    return this.swiperContainer;
  }
}
