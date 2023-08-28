import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductSliderView extends ViewBuilder {
  swiperContainer: HTMLDivElement;
  private swiperWrapper: HTMLDivElement;
  private images: string[] = [];

  constructor(images: string[]) {
    super();
    this.images = images;
    this.swiperContainer = this.createSwiperContainer();
    this.swiperWrapper = this.createSwiperWrapper();
  }

  createSwiperContainer(): HTMLDivElement {
    const container = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper"],
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
    const img = this.createElement<HTMLImageElement>("img", {
      classes: ["img-fluid"],
    });
    img.src = imageUrl;
    slide.appendChild(img);

    return slide;
  }

  createSwiperNavigation(buttonClass: string): HTMLDivElement {
    const navigation = this.createElement<HTMLDivElement>("div", {
      classes: [buttonClass],
    });

    return navigation;
  }

  render(): HTMLElement {
    this.swiperWrapper.innerHTML = "";

    this.images.forEach((imageUrl) => {
      const slide = this.createSwiperSlide(imageUrl);
      this.swiperWrapper.appendChild(slide);
    });

    this.swiperContainer.append(
      this.swiperWrapper,
      this.createSwiperNavigation("swiper-button-prev"),
      this.createSwiperNavigation("swiper-button-next")
    );

    return this.swiperContainer;
  }
}
