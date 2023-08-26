import CatalogComponent from "./catalog";

describe("CatalogComponent", () => {
  it("should instantiate", () => {
    const instance = new CatalogComponent();
    expect(instance).toBeInstanceOf(CatalogComponent);
  });
});
