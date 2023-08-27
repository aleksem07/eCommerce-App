import { Routes } from "@Services/router/router.types";
import ProductPage from "./product";

describe("ProductPage", () => {
  it("should instantiate", () => {
    const instance = new ProductPage();
    expect(instance).toBeInstanceOf(ProductPage);
  });

  it("should redirect to not found page when product id was not provided", () => {
    window.location.hash = "#product";

    const page = new ProductPage();
    page.init();

    expect(window.location.hash).toBe(Routes.NOT_FOUND);
  });
});
