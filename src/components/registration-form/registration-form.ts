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
import LinkComponent from "@Components/link/link";

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
  defaultAddressCheck: FormCheckComponent;
  defaultBillingAddressCheck: FormCheckComponent;
  sameAddressCheck: FormCheckComponent;
  streetBillingInput: FormControlComponent;
  cityBillingInput: FormControlComponent;
  countryBillingInput: FormSelectComponent;
  postalCodeBillingInput: FormControlComponent;
  loginLink: LinkComponent;

  isDefaultAddress: boolean;
  isDefaultAddressBilling: boolean;
  isDefaultAddressSame: boolean;

  // eslint-disable-next-line max-lines-per-function
  constructor() {
    this.isDefaultAddress = false;
    this.isDefaultAddressBilling = false;
    this.isDefaultAddressSame = false;
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
    this.countryBillingInput = this.createCountryBillingInputComponent();
    this.cityBillingInput = this.createCityBillingInputComponent();
    this.streetBillingInput = this.createStreetBillingInputComponent();
    this.postalCodeBillingInput = this.createPostalCodeBillingInputComponent();

    this.passwordCheck = new FormCheckComponent({
      labelText: "Show password",
      formName: "registration",
      inputName: "password",
    });
    this.defaultAddressCheck = new FormCheckComponent({
      labelText: "Set as default address",
      formName: "registration",
      inputName: "default-address",
    });
    this.sameAddressCheck = new FormCheckComponent({
      labelText: "Use the same address for both billing and shipping",
      formName: "registration",
      inputName: "same-address",
    });
    this.defaultBillingAddressCheck = new FormCheckComponent({
      labelText: "Set as default address",
      formName: "registration",
      inputName: "default-billing-address",
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

  // eslint-disable-next-line max-lines-per-function
  async submitFormHandler(inputValues: FormInput[]) {
    const isValidValues = inputValues.every(
      (inputValue) => this.validator.validate(inputValue.key, inputValue.value)?.isValid
    );

    if (isValidValues) {
      const shippingAddressStorage = 0;
      const billingAddressStorage = 1;
      const addresses = [
        {
          country: this.getValueByKey(inputValues, "country"),
          city: this.getValueByKey(inputValues, "city"),
          streetName: this.getValueByKey(inputValues, "street"),
          postalCode: this.getValueByKey(inputValues, "postal-code"),
        },
      ];

      if (!this.isDefaultAddressSame) {
        addresses.push({
          country: this.getValueByKey(inputValues, "country-billing"),
          city: this.getValueByKey(inputValues, "city-billing"),
          streetName: this.getValueByKey(inputValues, "street-billing"),
          postalCode: this.getValueByKey(inputValues, "postal-code-billing"),
        });
      }

      const values = {
        username: this.getValueByKey(inputValues, "email"),
        password: this.getValueByKey(inputValues, "password"),
        firstName: this.getValueByKey(inputValues, "first-name"),
        lastName: this.getValueByKey(inputValues, "last-name"),
        dateOfBirth: this.getValueByKey(inputValues, "date-of-birth"),
        addresses,
        shippingAddresses: [shippingAddressStorage],
        defaultShippingAddress: this.isDefaultAddress ? shippingAddressStorage : undefined,
        billingAddresses: !this.isDefaultAddressSame
          ? [billingAddressStorage]
          : [shippingAddressStorage],
        defaultBillingAddress:
          !this.isDefaultAddressSame && this.isDefaultAddressBilling
            ? billingAddressStorage
            : this.isDefaultAddressSame && this.isDefaultAddress
            ? shippingAddressStorage
            : undefined,
      };

      const result = await this.authService.signUp(values);

      if (!result.success && result.error) {
        this.tooltip.show("Error", result.error);
      } else {
        this.tooltip.show("Success", "Registration successful");
        eventBusService.publish(Events.userLogin);
        RouterService.navigateTo(Routes.MAIN);
      }
    } else {
      this.validateAllInputs();
    }
  }

  private validateAllInputs() {
    this.emailInput.validate();
    this.passwordInput.validate();
    this.firstNameInput.validate();
    this.lastNameInput.validate();
    this.dateOfBirthInput.validate();
    this.countryInput.validate();
    this.cityInput.validate();
    this.streetInput.validate();
    this.postalCodeInput.validate();
    this.countryBillingInput.validate();
    this.cityBillingInput.validate();
    this.streetBillingInput.validate();
    this.postalCodeBillingInput.validate();
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
      ],
    });
  }

  private createStreetBillingInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "street-billing",
      labelText: "Street billing",
      helpText: "At least one character",
      placeholderText: "123 Billing St",
    });
  }

  private createCountryBillingInputComponent() {
    return new FormSelectComponent({
      formName: "registration",
      inputName: "country-billing",
      labelText: "Country billing",
      helpText: "Select a valid country from the list",
      options: [
        { label: "Select a country", value: "" },
        { label: "United States", value: "US" },
      ],
    });
  }

  private createPostalCodeBillingInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "postal-code-billing",
      labelText: "Postal Code billing",
      helpText: "Follow the format for your country (e.g., 12345 or A1B 2C3)",
      placeholderText: "12345",
    });
  }

  private createCityBillingInputComponent() {
    return new FormControlComponent({
      formName: "registration",
      inputName: "city-billing",
      labelText: "City billing",
      helpText: "At least one character, no special characters or numbers",
      placeholderText: "New York",
    });
  }

  async checkboxHandler(status: boolean) {
    this.view.handleCheckboxResult(status);
  }

  async defaultAddressHandler(status: boolean) {
    this.isDefaultAddress = this.view.checkboxDefaultAddressResult(status);
  }

  async defaultAddressBillingHandler(status: boolean) {
    this.isDefaultAddressBilling = this.view.checkboxDefaultAddressResult(status);
  }

  async defaultAddressSameHandler(status: boolean) {
    this.isDefaultAddressSame = this.view.checkboxDefaultAddressResult(status);
    localStorage.setItem("defaultAddressSameCheckboxStatus", status.toString());
    this.view.clearFormContent();
    this.init();
  }

  // eslint-disable-next-line max-lines-per-function
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
    const countryBilling = this.countryBillingInput.init();
    const cityBilling = this.cityBillingInput.init();
    const streetBilling = this.streetBillingInput.init();
    const postalCodeBilling = this.postalCodeBillingInput.init();
    const setSameAddress = this.sameAddressCheck.init();
    const shippingAddressTitle = this.view.addressShippingTitle;
    const setDefaultAddress = this.defaultAddressCheck.init();
    const billingAddressTitle = this.view.addressBillingTitle;
    const setDefaultBillingAddress = this.defaultBillingAddressCheck.init();
    const loginLink = this.loginLink.init();

    if (this.isDefaultAddressSame) {
      this.view.render(
        loginLink,
        email,
        password,
        passwordCheck,
        firstName,
        lastName,
        dateOfBirth,
        setSameAddress,
        shippingAddressTitle,
        setDefaultAddress,
        country,
        city,
        street,
        postalCode
      );
    } else {
      this.view.render(
        loginLink,
        email,
        password,
        passwordCheck,
        firstName,
        lastName,
        dateOfBirth,
        setSameAddress,
        shippingAddressTitle,
        setDefaultAddress,
        country,
        city,
        street,
        postalCode,
        billingAddressTitle,
        setDefaultBillingAddress,
        countryBilling,
        cityBilling,
        streetBilling,
        postalCodeBilling
      );
    }
    this.view.checkboxAddressListener(
      "same-address-checkbox-input",
      this.defaultAddressSameHandler.bind(this)
    );
    this.view.checkboxAddressListener(
      "default-address-checkbox-input",
      this.defaultAddressHandler.bind(this)
    );
    this.view.checkboxAddressListener(
      "default-billing-address-checkbox-input",
      this.defaultAddressBillingHandler.bind(this)
    );
    this.tooltip.init(this.view.submitButton);
    this.view.checkboxListener(this.checkboxHandler.bind(this));
  }
}
