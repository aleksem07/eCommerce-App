import ProductPage from "./product";

describe("ProductPage", () => {
  it("should instantiate", () => {
    const instance = new ProductPage();
    expect(instance).toBeInstanceOf(ProductPage);
  });
});
