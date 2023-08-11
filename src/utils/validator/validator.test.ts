import ValidatorUtil from "./validator";

describe("ValidatorUtil", () => {
  let validator: ValidatorUtil;

  beforeEach(() => {
    validator = new ValidatorUtil();
  });
  describe("validatePassword", () => {
    it("should return isValid true for a valid password", () => {
      const password = "1Abc123!";
      const result = validator.validatePassword(password);
      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });
    it("should return isValid false and a message for an invalid password", () => {
      const password = "abc123";
      const result = validator.validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("Password must be at least 8 characters long");
    });
  });
  describe("validateEmail", () => {
    it("should return isValid true for a valid email", () => {
      const email = "example@gmail.com";
      const result = validator.validateEmail(email);
      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });
    it("should return isValid false and a message for an invalid email", () => {
      const email = "example";
      const result = validator.validateEmail(email);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("Email address must contain a period (@)");
    });
  });
});
