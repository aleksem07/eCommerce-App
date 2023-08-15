import ClientBuilderService from "./client-builder";

describe("ClientBuilderService", () => {
  it("should instantiate", () => {
    const instance = new ClientBuilderService();
    expect(instance).toBeInstanceOf(ClientBuilderService);
  });

  it("should initialize auth middleware options correctly", () => {
    const instance = new ClientBuilderService();
    expect(instance["authUrl"]).toEqual(expect.any(String));
    expect(instance["apiUrl"]).toEqual(expect.any(String));
    expect(instance["projectKey"]).toEqual(expect.any(String));
    expect(instance["scopes"]).toEqual(expect.any(String));
    expect(instance["adminID"]).toEqual(expect.any(String));
    expect(instance["adminSecret"]).toEqual(expect.any(String));
    expect(instance["clientID"]).toEqual(expect.any(String));
    expect(instance["clientSecret"]).toEqual(expect.any(String));
    expect(instance["customersApiSecret"]).toEqual(expect.any(String));
    expect(instance["customersApiID"]).toEqual(expect.any(String));
    expect(instance["customersApiScope"]).toEqual(expect.any(String));
  });
});
