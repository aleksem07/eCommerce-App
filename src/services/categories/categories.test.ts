import CategoriesService from "./categories";

describe("CategoriesService", () => {
  it("should instantiate", () => {
    const instance = new CategoriesService();
    expect(instance).toBeInstanceOf(CategoriesService);
  });
});
