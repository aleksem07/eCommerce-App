import ProductService from "./product";

describe("ProductService", () => {
  it("should instantiate", () => {
    const instance = new ProductService();
    expect(instance).toBeInstanceOf(ProductService);
  });
});