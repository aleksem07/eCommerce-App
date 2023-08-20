import LinkComponent from "./link";

describe("LinkComponent", () => {
  it("should instantiate", () => {
    const instance = new LinkComponent({
      href: "href",
      text: "text",
    });
    expect(instance).toBeInstanceOf(LinkComponent);
  });
});
