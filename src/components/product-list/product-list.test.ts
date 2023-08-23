import ProductListComponent from "./product-list";

describe("ProductListComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductListComponent();
    expect(instance).toBeInstanceOf(ProductListComponent);
  });
});