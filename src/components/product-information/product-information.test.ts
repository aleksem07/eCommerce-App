import ProductInformationComponent from "./product-information";

describe("ProductInformationComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductInformationComponent({
      title: "test",
      description: "test",
      imageUrl: "test",
      price: { currencyCode: "USD", value: 100 },
      id: "test",
    });
    expect(instance).toBeInstanceOf(ProductInformationComponent);
  });
});
