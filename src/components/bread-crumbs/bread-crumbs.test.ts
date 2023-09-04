import BreadCrumbsComponent from "./bread-crumbs";

describe("BreadCrumbsComponent", () => {
  it("should instantiate", () => {
    const instance = new BreadCrumbsComponent();
    expect(instance).toBeInstanceOf(BreadCrumbsComponent);
  });
});
