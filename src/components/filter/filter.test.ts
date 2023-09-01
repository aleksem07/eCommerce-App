import FilterComponent from "./filter";

describe("FilterComponent", () => {
  it("should instantiate", () => {
    const instance = new FilterComponent();
    expect(instance).toBeInstanceOf(FilterComponent);
  });
  it("should reset price range on initialization", () => {
    const instance = new FilterComponent();
    const resetPriceRangeMock = jest.fn();
    instance["resetPriceRange"] = resetPriceRangeMock;

    instance.init();

    expect(resetPriceRangeMock).toHaveBeenCalledTimes(1);
  });
});
