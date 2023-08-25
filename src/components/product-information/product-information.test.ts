import ProductInformationComponent from "./product-information";

describe("ProductInformationComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductInformationComponent();
    expect(instance).toBeInstanceOf(ProductInformationComponent);
  });
});