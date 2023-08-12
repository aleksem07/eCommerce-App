import fetch from "cross-fetch";
global.fetch = fetch;

import { AuthService } from "./auth";
import Auth from "./auth";

describe("AuthService", () => {
  it("should instantiate", () => {
    const instance = new AuthService();
    expect(instance).toBeInstanceOf(AuthService);
  });
  it("should have a check method", () => {
    const instance = new AuthService();
    expect(typeof instance.auth).toBe("function");
  });
});

describe("Auth", () => {
  it("should instantiate", () => {
    const instance = new Auth();
    expect(instance).toBeInstanceOf(Auth);
  });
  it("should have a check method", () => {
    const instance = new Auth();
    expect(typeof instance.check).toBe("function");
  });
});
