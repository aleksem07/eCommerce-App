import ProductFilterService from "./product-filter";

describe("ProductFilterService", () => {
  it("should instantiate", () => {
    const instance = new ProductFilterService();
    expect(instance).toBeInstanceOf(ProductFilterService);
  });
});
