import FormControlComponent from "@Components/form-control/form-control";
import RegistrationFormView from "./registration-form.view";
import { FormInput } from "./registration-form.types";
import ValidatorUtil from "@Utils/validator/validator";
import FormCheckComponent from "@Components/form-check/form-check";
import FormSelectComponent from "@Components/form-select/form-select";
import TooltipComponent from "@Components/tooltip/tooltip";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import AuthService from "@Services/auth/auth";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";

export default class RegistrationFormComponent {
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
  tooltip: TooltipComponent;
  authService: AuthService;

  constructor() {
    this.view = new RegistrationFormView();
    this.validator = new ValidatorUtil();
    this.tooltip = new TooltipComponent();
    this.authService = new AuthService();

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
  }

  async submitFormHandler(inputValues: FormInput[], registrationData: Record<string, string>) {
    const isValidValues = inputValues.every((inputValue) => {
      const result = this.validator.validate(inputValue.key, inputValue.value);

      return result?.isValid;
    });

    if (isValidValues) {
      const addresses = [
        {
          country: registrationData.country,
          city: registrationData.city,
          streetName: registrationData.streetName,
          postalCode: registrationData.postalCode,
        },
      ];
      const result = await this.authService.signUp(
        registrationData.email,
        registrationData.password,
        registrationData.firstName,
        registrationData.lastName,
        registrationData.dateOfBirth,
        addresses
      );

      if (!result.success && result.error) {
        this.tooltip.show("Error", result.error);
      } else {
        eventBusService.publish(Events.userLogin);
        RouterService.navigateTo(Routes.MAIN);
      }
    } else {
      this.tooltip.show("Error", "Please fill in all fields correctly");
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
      postalCode
    );
    this.view.checkboxListener(this.checkboxHandler.bind(this));
    this.tooltip.init(this.view.submitButton);
  }
}
