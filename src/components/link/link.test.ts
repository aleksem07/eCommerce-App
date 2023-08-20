import LinkComponent from "./link";

describe("LinkComponent", () => {
  it("should instantiate", () => {
    const instance = new LinkComponent();
    expect(instance).toBeInstanceOf(LinkComponent);
  });
});