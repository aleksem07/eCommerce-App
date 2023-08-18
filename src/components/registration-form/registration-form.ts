import FormControlComponent from "@Components/form-control/form-control";
import RegistrationFormView from "./registration-form.view";
import { FormInput } from "./registration-form.types";
import ValidatorUtil from "@Utils/validator/validator";
import FormCheckComponent from "@Components/form-check/form-check";

export default class RegistrationFormComponent {
  view: RegistrationFormView;
  emailInput: FormControlComponent;
  passwordInput: FormControlComponent;
  firstNameInput: FormControlComponent;
  lastNameInput: FormControlComponent;
  dateOfBirthInput: FormControlComponent;
  streetInput: FormControlComponent;
  countryInput: FormControlComponent;
  postalCodeInput: FormControlComponent;
  cityInput: FormControlComponent;
  validator: ValidatorUtil;
  passwordCheck: FormCheckComponent;

  constructor() {
    this.view = new RegistrationFormView();
    this.validator = new ValidatorUtil();

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

  submitFormHandler(inputValues: FormInput[]) {
    const isValidValues = inputValues.every((inputValue) => {
      const result = this.validator.validate(inputValue.key, inputValue.value);

      return result?.isValid;
    });

    if (isValidValues) {
      //call register method of auth service here
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
    return new FormControlComponent({
      formName: "registration",
      inputName: "country",
      labelText: "Country",
      helpText: "Select a valid country from the list",
      placeholderText: "US",
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
  }
}
