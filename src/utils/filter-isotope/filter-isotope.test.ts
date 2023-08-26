import FilterIsotopeUtil from "./filter-isotope";

describe("FilterIsotopeUtil", () => {
  it("should instantiate", () => {
    const instance = new FilterIsotopeUtil("grid");
    expect(instance).toBeInstanceOf(FilterIsotopeUtil);
  });
});
