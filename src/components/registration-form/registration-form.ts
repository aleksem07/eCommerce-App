import FormControlComponent from "@Components/form-control/form-control";
import RegistrationFormView from "./registration-form.view";
import { FormInput } from "./registration-form.types";
import ValidatorUtil from "@Utils/validator/validator";
import FormCheckComponent from "@Components/form-check/form-check";
import FormSelectComponent from "@Components/form-select/form-select";
import LinkComponent from "@Components/link/link";
import { Routes } from "@Services/router/router.types";
import AuthService from "@Services/auth/auth";
import TooltipComponent from "@Components/tooltip/tooltip";

export default class RegistrationFormComponent {
  authService: AuthService;
  tooltip: TooltipComponent;
  view: RegistrationFormView;
  emailInput: FormControlComponent;
  passwordInput: FormControlComponent;
  firstNameInput: FormControlComponent;
  lastNameInput: FormControlComponent;
  dateOfBirthInput: FormControlComponent;
  streetInput: FormControlComponent;
  countryInput: FormSelectComponent;
  postalCodeInput: FormControlComponent;
  cityInput: FormControlComponent;
  validator: ValidatorUtil;
  passwordCheck: FormCheckComponent;
  loginLink: LinkComponent;

  constructor() {
    this.view = new RegistrationFormView();
    this.validator = new ValidatorUtil();
    this.authService = new AuthService();
    this.tooltip = new TooltipComponent();

    this.emailInput = this.createEmailInputComponent();
    this.passwordInput = this.createPasswordInputComponent();
    this.firstNameInput = this.createFirstNameInputComponent();
    this.lastNameInput = this.createLastNameInputComponent();
    this.dateOfBirthInput = this.createDateOfBirthInputComponent();
    this.countryInput = this.createCountryInputComponent();
    this.cityInput = this.createCityInputComponent();
    this.streetInput = this.createStreetInputComponent();
    this.postalCodeInput = this.createPostalCodeInputComponent();

    this.view.submitFormListener(this.submitFormHandler.bind(this));

    this.passwordCheck = new FormCheckComponent({
      formName: "registration",
      inputName: "password",
    });

    this.loginLink = new LinkComponent({
      href: Routes.LOGIN,
      text: "Sign in",
      classes: ["ms-2"],
    });
  }

  private getValueByKey(inputs: FormInput[], key: string): string {
    const input = inputs.find((input) => input.key === key);

    if (!input) {
      throw new Error(`Value for key ${key} was not found`);
    }

    return input.value;
  }

  async submitFormHandler(inputValues: FormInput[]) {
    const isValidValues = inputValues.every((inputValue) => {
      const result = this.validator.validate(inputValue.key, inputValue.value);

      if (!result?.isValid) {
        this.tooltip.show("Error", result?.message as string);
      }

      return result?.isValid;
    });

    if (isValidValues) {
      const values = {
        username: this.getValueByKey(inputValues, "email"),
        password: this.getValueByKey(inputValues, "password"),
        firstName: this.getValueByKey(inputValues, "first-name"),
        lastName: this.getValueByKey(inputValues, "last-name"),
        dateBirth: this.getValueByKey(inputValues, "date-birth"),
        country: this.getValueByKey(inputValues, "country"),
        city: this.getValueByKey(inputValues, "city"),
        street: this.getValueByKey(inputValues, "street"),
        postalCode: this.getValueByKey(inputValues, "postal-code"),
      };
      const result = await this.authService.signUp(values);

      if (!result.success && result.error) {
        this.tooltip.show("Error", result.error);
      }
    }
  }

  private createPostalCodeInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "postal-code",
      labelText: "Postal Code",
      helpText: "Follow the format for your country (e.g., 12345 or A1B 2C3)",
      placeholderText: "12345",
    });
  }

  private createCityInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "city",
      labelText: "City",
      helpText: "At least one character, no special characters or numbers",
      placeholderText: "New York",
    });
  }

  private createEmailInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "email",
      labelText: "Email",
      helpText: "Write your email",
      placeholderText: "user@exapmle.com",
    });
  }

  private createPasswordInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "password",
      labelText: "Password",
      helpText: "Write your password",
      placeholderText: "Example1#",
    });
  }

  private createFirstNameInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "first-name",
      labelText: "First Name",
      helpText: "At least one character, no special characters or numbers",
      placeholderText: "John",
    });
  }

  private createLastNameInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "last-name",
      labelText: "Last Name",
      helpText: "At least one character, no special characters or numbers",
      placeholderText: "Doe",
    });
  }

  private createDateOfBirthInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "date-of-birth",
      labelText: "Date of Birth",
      helpText: "You must be 13 years old or older",
      placeholderText: "Type your date of birth",
      type: "date",
    });
  }

  private createStreetInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "street",
      labelText: "Street",
      helpText: "At least one character",
      placeholderText: "123 Main St",
    });
  }

  private createCountryInputComponent() {
    return new FormSelectComponent({
      formName: "registration",
      inputName: "country",
      labelText: "Country",
      helpText: "Select a valid country from the list",
      options: [
        { label: "Select a country", value: "" },
        { label: "United States", value: "US" },
        { label: "Canada", value: "CA" },
      ],
    });
  }

  async checkboxHandler(status: boolean) {
    this.view.handleCheckboxResult(status);
  }

  init() {
    const email = this.emailInput.init();
    const password = this.passwordInput.init();
    const passwordCheck = this.passwordCheck.init();
    const firstName = this.firstNameInput.init();
    const lastName = this.lastNameInput.init();
    const dateOfBirth = this.dateOfBirthInput.init();
    const country = this.countryInput.init();
    const city = this.cityInput.init();
    const street = this.streetInput.init();
    const postalCode = this.postalCodeInput.init();
    const loginLink = this.loginLink.init();
    this.view.render(
      email,
      password,
      passwordCheck,
      firstName,
      lastName,
      dateOfBirth,
      country,
      city,
      street,
      postalCode,
      loginLink
    );

    this.tooltip.init(this.view.submitButton);
    this.view.checkboxListener(this.checkboxHandler.bind(this));
  }
}
