import fetch from "cross-fetch";
global.fetch = fetch;

import LoginFormComponent from "./login-form";
import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";

// Mock the dependencies
jest.mock("./login-form.view");
jest.mock("@Utils/validator/validator");
const status = true;
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
  it("should call handleCheckboxResult with the provided status", () => {
    loginFormComponent.checkboxHandler(status);
    expect(loginFormComponent.view.handleCheckboxResult).toHaveBeenCalledWith(status);
  });
  it("should render the view on init", () => {
    loginFormComponent.init();
    expect(loginFormComponent.view.render).toHaveBeenCalled();
  });
});
