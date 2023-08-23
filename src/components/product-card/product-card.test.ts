import ProductCardComponent from "./product-card";

describe("ProductCardComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductCardComponent({
      title: "title",
      description: "description",
      imageUrl: "imageUrl",
    });
    expect(instance).toBeInstanceOf(ProductCardComponent);
  });
});
