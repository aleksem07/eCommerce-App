import SortComponent from "./sort";

describe("SortComponent", () => {
  it("should instantiate", () => {
    const instance = new SortComponent();
    expect(instance).toBeInstanceOf(SortComponent);
  });
  it("should render sort by select", () => {
    const instance = new SortComponent();
    const element = instance.init();
    const sortSelect = element.querySelector("select");
    expect(sortSelect).toBeTruthy();
  });
});
