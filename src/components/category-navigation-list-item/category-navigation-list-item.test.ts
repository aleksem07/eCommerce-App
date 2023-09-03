import CategoryNavigationListItemComponent from "./category-navigation-list-item";

describe("CategoryComponent", () => {
  it("should instantiate", () => {
    const instance = new CategoryNavigationListItemComponent("1", "1");
    expect(instance).toBeInstanceOf(CategoryNavigationListItemComponent);
  });
});
