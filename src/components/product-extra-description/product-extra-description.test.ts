import ProductExtraDescriptionComponent from "./product-extra-description";

describe("ProductExtraDescriptionComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductExtraDescriptionComponent({
      title: "test",
      content: "test",
      list: ["test"],
    });
    expect(instance).toBeInstanceOf(ProductExtraDescriptionComponent);
  });
});
