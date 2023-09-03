import ProductSearchComponent from "./product-search";

describe("ProductSearchComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductSearchComponent();
    expect(instance).toBeInstanceOf(ProductSearchComponent);
  });
});
