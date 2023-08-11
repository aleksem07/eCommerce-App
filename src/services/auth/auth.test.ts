import fetch from "cross-fetch";
global.fetch = fetch;

import AuthService from "./auth";

describe("AuthService", () => {
  it("should instantiate", () => {
    const instance = new AuthService();
    expect(instance).toBeInstanceOf(AuthService);
  });
});
