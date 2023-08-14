import ClientBuilderService from "./client-builder";

describe("ClientBuilderService", () => {
  it("should instantiate", () => {
    const instance = new ClientBuilderService();
    expect(instance).toBeInstanceOf(ClientBuilderService);
  });

  it("should initialize auth middleware options correctly", () => {
    process.env.PROJECT_KEY = "project_key";
    process.env.AUTH_URL = "auth_url";
    process.env.SCOPES = "scope1,scope2";
    process.env.ADMIN_ID = "admin_id";
    process.env.ADMIN_SECRET = "admin_secret";
    const instance = new ClientBuilderService();
    expect(instance["authMiddlewareOptions"].host).toBe("auth_url");
    expect(instance["authMiddlewareOptions"].projectKey).toBe("project_key");
    expect(instance["authMiddlewareOptions"].credentials.clientId).toBe("admin_id");
    expect(instance["authMiddlewareOptions"].credentials.clientSecret).toBe("admin_secret");
    expect(instance["authMiddlewareOptions"].scopes).toEqual(["scope1", "scope2"]);
    delete process.env.PROJECT_KEY;
    delete process.env.AUTH_URL;
    delete process.env.SCOPES;
    delete process.env.ADMIN_ID;
    delete process.env.ADMIN_SECRET;
  });

  it("should initialize http middleware options correctly", () => {
    process.env.API_URL = "api_url";
    const instance = new ClientBuilderService();
    expect(instance["httpMiddlewareOptions"].host).toBe("api_url");
    delete process.env.API_URL;
  });
});
