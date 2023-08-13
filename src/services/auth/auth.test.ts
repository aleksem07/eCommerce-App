import fetch from "cross-fetch";
global.fetch = fetch;

import AuthService from "./auth";

describe("AuthService", () => {
  it("should instantiate", () => {
    const instance = new AuthService();
    expect(instance).toBeInstanceOf(AuthService);
  });

  it("should call the login method and return success", async () => {
    const instance = new AuthService();
    process.env.PROJECT_KEY = "project_key";
    const mockResponse = { someData: "example" };
    instance["commercetoolsClient"].execute = jest.fn().mockResolvedValue(mockResponse);
    const result = await instance.checkClient("example@example.com", "password");
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockResponse);
    delete process.env.PROJECT_KEY;
  });

  it("should call the login method and return an error", async () => {
    const instance = new AuthService();
    process.env.PROJECT_KEY = "project_key";
    const errorMessage = "Some error message";
    const mockError = { message: errorMessage };
    instance["commercetoolsClient"].execute = jest.fn().mockRejectedValue(mockError);
    const result = await instance.checkClient("example@example.com", "password");
    expect(result.success).toBe(false);
    expect(result.error).toBe(errorMessage);
    delete process.env.PROJECT_KEY;
  });
});
