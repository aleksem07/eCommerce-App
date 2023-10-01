import CategoryService from "./category";

describe("CategoriesService", () => {
  it("should instantiate", () => {
    const instance = new CategoryService();
    expect(instance).toBeInstanceOf(CategoryService);
  });
});
