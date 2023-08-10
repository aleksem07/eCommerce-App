import ClientSignInService from "./client-sign-in";

describe("ClientSignInService", () => {
  it("should instantiate", async () => {
    const instance = new ClientSignInService();
    const result = await instance.checkUserLogin("ivan@ivanov.com", "password");
    expect(result.statusCode).toBe(200);
  });
});
