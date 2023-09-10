import ProductPaginationComponent from "./product-pagination";

describe("ProductPaginationComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductPaginationComponent();
    expect(instance).toBeInstanceOf(ProductPaginationComponent);
  });
  it("should return a valid result from the init method", () => {
    const instance = new ProductPaginationComponent();
    const result = instance.init();

    expect(result).toBeTruthy();
  });
});
