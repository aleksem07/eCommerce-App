import CatalogPage from "./catalog";

describe("CatalogPage", () => {
  it("should instantiate", () => {
    const instance = new CatalogPage();
    expect(instance).toBeInstanceOf(CatalogPage);
  });
});