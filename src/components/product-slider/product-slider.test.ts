import ProductSliderComponent from "./product-slider";

describe("ProductSliderComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductSliderComponent();
    expect(instance).toBeInstanceOf(ProductSliderComponent);
  });
});
