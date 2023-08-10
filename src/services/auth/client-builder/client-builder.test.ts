import ClientBuilderService from "./client-builder";

describe("ClientBuilderService", () => {
  it("should instantiate", () => {
    const instance = new ClientBuilderService();
    expect(instance).toBeInstanceOf(ClientBuilderService);
  });
});
