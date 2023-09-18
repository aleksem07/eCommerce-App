import ProductListComponent from "./product-list";

describe("ProductListComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductListComponent();
    expect(instance).toBeInstanceOf(ProductListComponent);
  });

  it("should render products", async () => {
    const instance = new ProductListComponent();

    const productListEl = instance.init([
      {
        id: "1",
        title: "test",
        description: "test",
        images: ["test"],
        price: {
          value: 1,
          currencyCode: "USD",
        },
      },
      {
        id: "2",
        title: "test",
        description: "test",
        images: ["test"],
        price: {
          value: 1,
          currencyCode: "USD",
        },
      },
      {
        id: "3",
        title: "test",
        description: "test",
        images: ["test"],
        price: {
          value: 1,
          currencyCode: "USD",
        },
      },
    ]);

    const productCards = (await productListEl).querySelectorAll(".col-12");

    expect(productCards).toHaveLength(3);
  });
});
