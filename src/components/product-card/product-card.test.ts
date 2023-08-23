import ProductCardComponent from "./product-card";

describe("ProductCardComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductCardComponent();
    expect(instance).toBeInstanceOf(ProductCardComponent);
  });
});