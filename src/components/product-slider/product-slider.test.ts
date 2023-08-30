import Swiper from "swiper";
import ProductSliderComponent from "./product-slider";
import { EffectCoverflow, Navigation, Thumbs } from "swiper/modules";

jest.mock("swiper");

describe("ProductSliderComponent", () => {
  beforeEach(() => {
    (Swiper as unknown as jest.Mock).mockClear();
  });

  it("should instantiate", () => {
    const instance = new ProductSliderComponent(["test.jpg"]);
    expect(instance).toBeInstanceOf(ProductSliderComponent);
  });

  it("should initialize thumbnail swiper with the correct options", () => {
    const instance = new ProductSliderComponent(["test.jpg"]);

    instance.initializeSwiper();

    expect(Swiper).toHaveBeenCalledWith(instance.thumbsContainer, {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
  });

  it("should initialize image swiper with the correct options", () => {
    const instance = new ProductSliderComponent(["test.jpg"]);

    instance.initializeSwiper();

    expect(Swiper).toHaveBeenLastCalledWith(instance.imageContainer, {
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
        swiper: expect.anything(),
      },
    });
  });
});
