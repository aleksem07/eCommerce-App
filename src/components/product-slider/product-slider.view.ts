import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductSliderView extends ViewBuilder {
  imageContainer: HTMLDivElement;
  thumbsContainer: HTMLDivElement;
  private contentContainer: HTMLDivElement;
  private images: string[] = [];
  private IMAGE_ID = "image-container";
  private THUMBS_ID = "thumbs-container";

  constructor(images: string[]) {
    super();
    this.images = images;
    this.imageContainer = this.createSwiperContainer(this.IMAGE_ID, true);
    this.thumbsContainer = this.createSwiperContainer(this.THUMBS_ID, false);
    this.contentContainer = this.createContentContainer();
  }

  private createContentContainer(): HTMLDivElement {
    const container = this.createElement<HTMLDivElement>("div");

    return container;
  }

  private createSwiperContainer(id: string, hasNavigation: boolean): HTMLDivElement {
    const container = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper", "mb-5"],
      id,
    });

    const wrapper = this.createSwiperWrapper();
    container.append(wrapper);

    this.images.forEach((imageUrl, index) => {
      const slide = this.createSwiperSlide(imageUrl, index);
      wrapper.append(slide);
    });

    if (hasNavigation) {
      container.append(
        this.createSwiperNavigation("swiper-button-prev"),
        this.createSwiperNavigation("swiper-button-next")
      );
    }

    return container;
  }

  private createSwiperWrapper(): HTMLDivElement {
    const wrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper-wrapper"],
    });

    return wrapper;
  }

  private createSwiperSlide(imageUrl: string, index: number): HTMLDivElement {
    const slide = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper-slide"],
      dataset: [{ index: String(index) }],
    });
    const img = this.createElement<HTMLImageElement>("img", {
      classes: ["img-fluid"],
    });
    img.src = imageUrl;
    slide.appendChild(img);

    return slide;
  }

  private createSwiperNavigation(buttonClass: string): HTMLDivElement {
    const navigation = this.createElement<HTMLDivElement>("div", {
      classes: [buttonClass],
    });

    return navigation;
  }

  swiperSlideListener(handler: (index: string) => void) {
    this.imageContainer.addEventListener("click", (e) => {
      const target = e.target;

      if (this.isHTMLElement(target)) {
        const slide = target.closest(".swiper-slide") as HTMLDivElement;

        if (slide) {
          const index = slide.dataset.index;

          if (index) {
            handler(index);
          }
        }
      }
    });
  }

  render(): HTMLElement {
    this.contentContainer.innerHTML = "";
    this.contentContainer.append(this.imageContainer, this.thumbsContainer);

    return this.contentContainer;
  }
}
