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

  it("should display discounted price and old price", () => {
    const instance = new ProductPriceComponent({
      price: { currencyCode: "USD", value: 100 },
      discountedPrice: { currencyCode: "USD", value: 100 },
    });

    const priceElement = instance.init();

    const price = priceElement.querySelector("[data-testid='price']");
    const oldPrice = priceElement.querySelector("[data-testid='old-price']");
    const discountedPrice = priceElement.querySelector("[data-testid='discounted-price']");
    expect(oldPrice).toBeDefined();
    expect(discountedPrice).toBeDefined();
    expect(price).toBeNull();
  });

  it("should display regular font size when size is sm", () => {
    const instance = new ProductPriceComponent({
      price: { currencyCode: "USD", value: 100 },
      discountedPrice: { currencyCode: "USD", value: 100 },
      size: "sm",
    });

    const priceElement = instance.init();

    const oldPrice = priceElement.querySelector("[data-testid='old-price']");
    const discountedPrice = priceElement.querySelector("[data-testid='discounted-price']");
    expect(oldPrice?.classList).toContain("fs-6");
    expect(discountedPrice?.classList).toContain("fs-5");
  });

  it("should display bigger font size when size is md", () => {
    const instance = new ProductPriceComponent({
      price: { currencyCode: "USD", value: 100 },
      discountedPrice: { currencyCode: "USD", value: 100 },
      size: "md",
    });

    const priceElement = instance.init();

    const oldPrice = priceElement.querySelector("[data-testid='old-price']");
    const discountedPrice = priceElement.querySelector("[data-testid='discounted-price']");
    expect(oldPrice?.classList).toContain("fs-5");
    expect(discountedPrice?.classList).toContain("fs-4");
  });
});
