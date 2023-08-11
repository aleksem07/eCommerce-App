import ErrorHandlerUtil from "./error-handler";

describe("ErrorHandlingUtil", () => {
  it("should instantiate", () => {
    const instance = new ErrorHandlerUtil();
    expect(instance).toBeInstanceOf(ErrorHandlerUtil);
  });
});
