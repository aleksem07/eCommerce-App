import CategoryComponent from "./category";

describe("CategoryComponent", () => {
  it("should instantiate", () => {
    const instance = new CategoryComponent("1", "1");
    expect(instance).toBeInstanceOf(CategoryComponent);
  });
});
