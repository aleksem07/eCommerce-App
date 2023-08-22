import UserProfilePage from "./user-profile";

describe("UserProfilePage", () => {
  it("should instantiate", () => {
    const instance = new UserProfilePage();
    expect(instance).toBeInstanceOf(UserProfilePage);
  });
});