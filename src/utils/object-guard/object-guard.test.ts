import ObjectGuardUtil from "./object-guard";

describe("ObjectGuardUtil", () => {
  it("should instantiate", () => {
    const instance = new ObjectGuardUtil();
    expect(instance).toBeInstanceOf(ObjectGuardUtil);
  });
});
