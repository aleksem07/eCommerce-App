import LoginFormView from "./login-form.view";
import FormControlComponent from "@Components/form-control/form-control";
import FormCheckComponent from "@Components/form-check/form-check";
import AuthService from "@Services/auth/auth";
import TooltipComponent from "@Components/tooltip/tooltip";
import ValidatorUtil from "@Utils/validator/validator";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import LinkComponent from "@Components/link/link";
import { FormInput } from "./login-form.types";

export default class LoginFormComponent {
  emailInput: FormControlComponent;
  passwordInput: FormControlComponent;
  passwordCheck: FormCheckComponent;
  private view: LoginFormView;
  authService: AuthService;
  tooltip: TooltipComponent;
  validator: ValidatorUtil;
  registrationLink: LinkComponent;

  constructor() {
    this.validator = new ValidatorUtil();

    this.authService = new AuthService();

    this.tooltip = new TooltipComponent();

    this.view = new LoginFormView();

    this.emailInput = new FormControlComponent({
      formName: "login",
      inputName: "email",
      labelText: "Email",
      helpText: "Write your email",
      placeholderText: "user@exapmle.com",
    });

    this.passwordInput = new FormControlComponent({
      formName: "login",
      inputName: "password",
      labelText: "Password",
      helpText: "Write your password",
      placeholderText: "Example1#",
    });

    this.passwordCheck = new FormCheckComponent({
      labelText: "Show password",
      formName: "login",
      inputName: "password",
    });

    this.registrationLink = new LinkComponent({
      href: Routes.REGISTRATION,
      text: "Sign up",
      classes: ["ms-2"],
    });

    this.view.submitFormListener(this.submitFormHandler.bind(this));
  }

  private getValueByKey(inputs: FormInput[], key: string): string {
    const input = inputs.find((input) => input.key === key);

    if (!input) {
      throw new Error(`Value for key ${key} was not found`);
    }

    return input.value;
  }

  async submitFormHandler(inputValues: FormInput[]) {
    const isValidValues = inputValues.every(
      (inputValue) => this.validator.validate(inputValue.key, inputValue.value)?.isValid
    );

    if (isValidValues) {
      const result = await this.authService.signIn(
        this.getValueByKey(inputValues, "email"),
        this.getValueByKey(inputValues, "password")
      );

      if (!result.success && result.error) {
        this.tooltip.show("Error", result.error);
      } else {
        eventBusService.publish(Events.userLogin);
        RouterService.navigateTo(Routes.MAIN);
      }
    } else {
      this.emailInput.validate();
      this.passwordInput.validate();
    }
  }

  async checkboxHandler(status: boolean) {
    this.view.handleCheckboxResult(status);
  }

  init() {
    const email = this.emailInput.init();
    const password = this.passwordInput.init();
    const showPassword = this.passwordCheck.init();
    const registrationLink = this.registrationLink.init();
    this.view.render({
      email,
      password,
      showPassword,
      registrationLink,
    });
    this.view.checkboxListener(this.checkboxHandler.bind(this));
    this.tooltip.init(this.view.submitButton);
  }
}
