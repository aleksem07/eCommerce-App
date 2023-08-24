import ProductPriceComponent from "./product-price";

describe("ProductPriceComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductPriceComponent(
      { currencyCode: "USD", value: 100 },
      { currencyCode: "USD", value: 100 }
    );
    expect(instance).toBeInstanceOf(ProductPriceComponent);
  });
});
