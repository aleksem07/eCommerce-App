import ProductSliderComponent from "./product-slider";

describe("ProductSliderComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductSliderComponent(["test.jpg"], true);
    expect(instance).toBeInstanceOf(ProductSliderComponent);
  });
});
