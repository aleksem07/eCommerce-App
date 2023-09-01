import CategoryComponent from "./category";

describe("CategoryComponent", () => {
  it("should instantiate", () => {
    const instance = new CategoryComponent({ id: "1", name: "1", ancestors: [] });
    expect(instance).toBeInstanceOf(CategoryComponent);
  });
});
