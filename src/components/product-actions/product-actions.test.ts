import ProductActionsComponent from "./product-actions";

describe("ProductActionsComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductActionsComponent("id");
    expect(instance).toBeInstanceOf(ProductActionsComponent);
  });
});
