import ValidatorUtil from "./validator";

describe("ValidatorUtil", () => {
  it("should instantiate", () => {
    const instance = new ValidatorUtil();
    expect(instance).toBeInstanceOf(ValidatorUtil);
  });
});