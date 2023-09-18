import ProductPriceComponent from "./product-price";

describe("ProductPriceComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductPriceComponent({
      price: { currencyCode: "USD", value: 100 },
      discountedPrice: { currencyCode: "USD", value: 100 },
    });
    expect(instance).toBeInstanceOf(ProductPriceComponent);
  });

  it("should display price when no discounted price", () => {
    const instance = new ProductPriceComponent({ price: { currencyCode: "USD", value: 100 } });

    const priceElement = instance.init();

    const price = priceElement.querySelector("[data-testid='price']");
    const oldPrice = priceElement.querySelector("[data-testid='old-price']");
    const discountedPrice = priceElement.querySelector("[data-testid='discounted-price']");
    expect(price).toBeDefined();
    expect(discountedPrice).toBeNull();
    expect(oldPrice).toBeNull();
  });
});
