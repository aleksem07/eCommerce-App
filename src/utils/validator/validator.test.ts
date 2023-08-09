import ValidatorUtil from "./validator";

describe("ValidatorUtil", () => {
  let validatorUtil: ValidatorUtil;

  beforeEach(() => {
    validatorUtil = new ValidatorUtil();
  });

  describe("validateEmail", () => {
    it("should return true for a valid email", () => {
      const validEmail = "test@example.com";
      const isValid = validatorUtil.validateEmail(validEmail);
      expect(isValid).toBe(true);
    });

    it("should return false for an invalid email", () => {
      const invalidEmail = "invalidemail";
      const isValid = validatorUtil.validateEmail(invalidEmail);
      expect(isValid).toBe(false);
    });
  });

  describe("validatePassword", () => {
    it("should return true for a valid password", () => {
      const validPassword = "password123";
      const isValid = validatorUtil.validatePassword(validPassword);
      expect(isValid).toBe(true);
    });

    it("should return false for an invalid password", () => {
      const invalidPassword = "pw";
      const isValid = validatorUtil.validatePassword(invalidPassword);
      expect(isValid).toBe(false);
    });
  });
});
