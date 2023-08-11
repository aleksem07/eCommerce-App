import ErrorHandlerUtil from "./error-handler";

describe("ErrorHandlingUtil", () => {
  it("should instantiate", () => {
    const instance = new ErrorHandlerUtil("body");
    expect(instance).toBeInstanceOf(ErrorHandlerUtil);
  });
});
