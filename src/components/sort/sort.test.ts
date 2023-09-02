import SortComponent from "./sort";
import SortView from "./sort.view";

describe("SortComponent", () => {
  it("should instantiate", () => {
    const instance = new SortComponent();
    expect(instance).toBeInstanceOf(SortComponent);
  });
  it("should call SortView.render with the correct arguments when init is called", () => {
    const instance = new SortComponent();
    const fakeSelectElement = document.createElement("select");
    instance["sortByInput"].init = jest.fn().mockReturnValue(fakeSelectElement);
    const fakeRenderedElement = document.createElement("div");
    SortView.prototype.render = jest.fn().mockReturnValue(fakeRenderedElement);

    const result = instance.init();

    expect(SortView.prototype.render).toHaveBeenCalledWith(fakeSelectElement);
    expect(result).toEqual(fakeRenderedElement);
  });
});
