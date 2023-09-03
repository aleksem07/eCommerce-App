import ProductService from "./product";
import { Price } from "./product.types";

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
    it("should return filters when size and color provided", () => {
      const productService = new ProductService();

      const size: string[] = ["S", "M", "L"];
      const color: string[] = ["Red", "Blue"];

      const { sizeFilter, colorFilter } = productService.generateFilters(size, color);

      expect(sizeFilter).toBe('variants.attributes.size:"S", "M", "L"');
      expect(colorFilter).toBe('variants.attributes.color.key:"Red", "Blue"');
    });
  });

  describe("getPrice", () => {
    it("should return a default Price object when prices are not available", () => {
      const productService = new ProductService();

      const prices: Price[] | undefined = undefined;

      const price = productService["getPrice"](prices);

      expect(price.currencyCode).toBe("USD");
      expect(price.value).toBe(0);
    });
  });

  describe("getDiscountedPrice", () => {
    it("should return undefined when prices are not available", () => {
      const productService = new ProductService();

      const prices = undefined;

      const discountedPrice = productService["getDiscountedPrice"](prices);

      expect(discountedPrice).toBeUndefined();
    });
  });

  describe("mapProductImages", () => {
    it("should map product images when images are available", () => {
      const productService = new ProductService();

      const images = [
        { url: "image1.jpg", dimensions: { w: 800, h: 600 } },
        { url: "image2.jpg", dimensions: { w: 800, h: 600 } },
        { url: "image3.jpg", dimensions: { w: 800, h: 600 } },
      ];

      const mappedImages = productService["mapProductImages"](images);

      expect(mappedImages).toHaveLength(3);
      expect(mappedImages).toEqual(["image1.jpg", "image2.jpg", "image3.jpg"]);
    });

    it("should handle the case when no images are available", () => {
      const productService = new ProductService();

      const images = undefined;

      const mappedImages = productService["mapProductImages"](images);

      expect(mappedImages).toEqual([]);
    });
  });
});
