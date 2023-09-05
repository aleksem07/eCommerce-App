import FormControlComponent from "@Components/form-control/form-control";
import UserAddressView from "./user-address.view";
import FormCheckComponent from "@Components/form-check/form-check";
import { UserAddressFormData, UserAddressProps } from "./user-address.types";
import { Address, Customer } from "@Services/customer/customer.types";
import ValidatorUtil from "@Utils/validator/validator";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { NotificationVariant } from "@Components/notification/notification.types";
import CustomerService from "@Services/customer/customer";
import ButtonRadioGroupComponent from "@Components/button-radio-group/button-radio-group";

export default class UserAddressComponent {
  private view: UserAddressView;
  private countryInput!: FormControlComponent;
  private cityInput!: FormControlComponent;
  private streetInput!: FormControlComponent;
  private postalCodeInput!: FormControlComponent;
  private isDefaultAddress!: FormCheckComponent;
  private addressTypes!: ButtonRadioGroupComponent;
  private formName = "user-address";
  private isEditMode = false;
  // private customer: Customer;
  private validator: ValidatorUtil;
  private customerService: CustomerService;
  private address: Address;
  private buttonRadioGroupName: string;

  constructor({ header, address }: UserAddressProps) {
    this.address = address;
    this.view = new UserAddressView(header);
    this.customerService = new CustomerService();

    this.validator = new ValidatorUtil();
    this.formName = `${this.formName}-${header.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")}`;
    this.buttonRadioGroupName = this.formName;

    this.instantiateComponents();

    this.view.submitFormListener(this.submitFormHandler.bind(this));
    this.view.editButtonListener(this.editButtonHandler.bind(this));
  }

  private createCheckBox(isChecked: boolean, isEditMode: boolean) {
    return new FormCheckComponent({
      formName: this.formName,
      inputName: "is-default-address",
      labelText: "Default Address",
      checked: isChecked,
      disabled: !isEditMode,
    });
  }

  private createRadioButtons() {
    return new ButtonRadioGroupComponent(
      [
        {
          button: "Use as shipping address",
          checked: this.address.isShippingAddress && !this.address.isBillingAddress,
        },
        {
          button: "Use as billing address",
          checked: this.address.isBillingAddress && !this.address.isShippingAddress,
        },
        {
          button: "Use for both",
          checked: this.address.isShippingAddress && this.address.isBillingAddress,
        },
      ],
      this.buttonRadioGroupName,
      !this.isEditMode
    );
  }

  async submitFormHandler(inputValues: UserAddressFormData) {
    const areValuesValid = [...inputValues.entries()]
      // Filter out from validation button radio inputs
      .filter(([key]) => key !== this.buttonRadioGroupName)
      .every(([key, value]) => this.validator.validate(key, value)?.isValid);

    if (areValuesValid) {
      // const info = this.mapInputValuesToCustomer(inputValues);
      // const customer = await this.customerService.updateInfo(info);

      // if (customer) {
      // this.customer = customer;
      this.isEditMode = false;
      this.instantiateComponents();
      this.init();
      // }
    } else {
      this.countryInput.validate();
      this.cityInput.validate();
      this.streetInput.validate();
      this.postalCodeInput.validate();

      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: "Invalid input values",
      });
    }
  }

  // private mapInputValuesToCustomer(inputValues: UserAddressFormData): CustomerAddresses {
  //   throw new Error("Method not implemented.");
  // }

  private instantiateComponents() {
    this.countryInput = new FormControlComponent({
      formName: this.formName,
      inputName: "country",
      labelText: "Country",
      placeholderText: "Enter your country",
      value: this.address.country,
      disabled: !this.isEditMode,
      //TODO: SELECT COMPONENT
    });
    this.cityInput = new FormControlComponent({
      formName: this.formName,
      inputName: "city",
      labelText: "City",
      placeholderText: "Enter your city",
      value: this.address.city,
      disabled: !this.isEditMode,
    });
    this.streetInput = new FormControlComponent({
      formName: this.formName,
      inputName: "street",
      labelText: "Street",
      placeholderText: "Enter your street",
      value: this.address.streetName,
      disabled: !this.isEditMode,
    });
    this.postalCodeInput = new FormControlComponent({
      formName: this.formName,
      inputName: "postal-code",
      labelText: "Postal Code",
      placeholderText: "Enter your postal code",
      value: this.address.postalCode,
      disabled: !this.isEditMode,
    });
    this.isDefaultAddress = this.createCheckBox(this.address.isDefaultAddress, this.isEditMode);
    this.addressTypes = this.createRadioButtons();
  }

  editButtonHandler() {
    this.isEditMode = true;
    this.instantiateComponents();
    this.init();
  }

  init() {
    const countryInput = this.countryInput.init();
    const cityInput = this.cityInput.init();
    const streetInput = this.streetInput.init();
    const postalCodeInput = this.postalCodeInput.init();
    const isDefaultAddress = this.isDefaultAddress.init();
    const addressTypes = this.addressTypes.init();

    return this.view.render({
      countryInput,
      cityInput,
      streetInput,
      postalCodeInput,
      isDefaultAddress,
      addressTypes,
      isEditMode: this.isEditMode,
    });
  }
}
