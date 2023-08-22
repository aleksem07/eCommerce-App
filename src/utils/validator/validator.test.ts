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

  describe("dateOfBirth", () => {
    it("should be valid when format is MM/DD/YYYY", () => {
      const dateOfBirth = "10/10/2000";

      const result = validator.validateDateOfBirth(dateOfBirth);

      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });

    it("should be valid when format is MM.DD.YYYY", () => {
      const dateOfBirth = "10.10.2000";

      const result = validator.validateDateOfBirth(dateOfBirth);

      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });

    it("should not be valid when date is less then 13 years from current", () => {
      const dateOfBirth = "10/10/2020";

      const result = validator.validateDateOfBirth(dateOfBirth);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe("You must be 13 years old or older");
    });

    it("should not be valid when date is 99/99/1922", () => {
      const dateOfBirth = "99/99/1922";

      const result = validator.validateDateOfBirth(dateOfBirth);

      expect(result.isValid).toBe(false);
      expect(result.message).toBeDefined();
    });
  });
});
