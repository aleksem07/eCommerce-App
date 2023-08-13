import fetch from "cross-fetch";
global.fetch = fetch;

import AppComponent from "./app";

describe("AppComponent", () => {
  it("should instantiate", () => {
    const instance = new AppComponent();
    expect(instance).toBeInstanceOf(AppComponent);
  });
});
