import ProductSearchComponent from "./product-search";

describe("ProductSearchComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductSearchComponent();
    expect(instance).toBeInstanceOf(ProductSearchComponent);
  });
  it("should initialize and render the search input", () => {
    const instance = new ProductSearchComponent();
    const renderedComponent = instance.init();

    expect(renderedComponent).toBeInstanceOf(HTMLElement);

    const searchInput = renderedComponent.querySelector("input[type='search']");
    expect(searchInput).toBeInstanceOf(HTMLInputElement);

    // You can add more specific assertions related to the search input here
  });
});
