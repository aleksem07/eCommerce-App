import ProductServiceService from "./product-service";

describe("ProductServiceService", () => {
  it("should instantiate", () => {
    const instance = new ProductServiceService();
    expect(instance).toBeInstanceOf(ProductServiceService);
  });
});
