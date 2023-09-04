import SearchProductsPage from "./search-products";

describe("SearchProductsPage", () => {
  it("should instantiate", () => {
    const instance = new SearchProductsPage();
    expect(instance).toBeInstanceOf(SearchProductsPage);
  });
});
