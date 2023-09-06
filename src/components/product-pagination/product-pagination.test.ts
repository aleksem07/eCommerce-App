import ProductPaginationComponent from "./product-pagination";

describe("ProductPaginationComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductPaginationComponent();
    expect(instance).toBeInstanceOf(ProductPaginationComponent);
  });
});
