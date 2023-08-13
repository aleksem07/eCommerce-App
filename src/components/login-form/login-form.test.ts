import fetch from "cross-fetch";
global.fetch = fetch;

import LoginFormComponent from "./login-form";
import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";

// Mock the dependencies
jest.mock("./login-form.view");
jest.mock("@Utils/validator/validator");
describe("LoginFormComponent", () => {
  let loginFormComponent: LoginFormComponent;
  beforeEach(() => {
    loginFormComponent = new LoginFormComponent();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should initialize the view and validator", () => {
    expect(loginFormComponent.view).toBeInstanceOf(LoginFormView);
    expect(loginFormComponent.validator).toBeInstanceOf(ValidatorUtil);
  });
});
