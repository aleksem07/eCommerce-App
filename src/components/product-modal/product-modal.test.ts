import ProductModalComponent from "./product-modal";

describe("ProductModalComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductModalComponent(["test"]);
    expect(instance).toBeInstanceOf(ProductModalComponent);
  });
});
