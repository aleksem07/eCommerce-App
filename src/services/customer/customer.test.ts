import CustomerService from "./customer";

describe("CustomerService", () => {
  it("should instantiate", () => {
    const instance = new CustomerService();
    expect(instance).toBeInstanceOf(CustomerService);
  });
});
