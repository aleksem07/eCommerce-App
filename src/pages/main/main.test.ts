import MainPage from "./main";

describe("MainPage", () => {
  it("should instantiate", () => {
    const instance = new MainPage();
    expect(instance).toBeInstanceOf(MainPage);
  });
});
