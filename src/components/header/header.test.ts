import HeaderComponent from "./header";

describe("HeaderComponent", () => {
  it("should instantiate", () => {
    const instance = new HeaderComponent();
    expect(instance).toBeInstanceOf(HeaderComponent);
  });
});