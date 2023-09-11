import TeamComponent from "./team";

describe("TeamComponent", () => {
  it("should instantiate", () => {
    const instance = new TeamComponent();
    expect(instance).toBeInstanceOf(TeamComponent);
  });
});
