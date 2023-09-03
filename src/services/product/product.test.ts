import ProductService from "./product";

describe("ProductService", () => {
  it("should instantiate", () => {
    const instance = new ProductService();
    expect(instance).toBeInstanceOf(ProductService);
  });
  describe("generateFilters", () => {
    it("should return empty filters when no size or color provided", () => {
      const productService = new ProductService();

      const size: string[] = [];
      const color: string[] = [];

      const { sizeFilter, colorFilter } = productService.generateFilters(size, color);

      expect(sizeFilter).toBe("");
      expect(colorFilter).toBe("");
    });
  });
});
