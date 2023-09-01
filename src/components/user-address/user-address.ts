import FormControlComponent from "@Components/form-control/form-control";
import UserAddressView from "./user-address.view";
import FormCheckComponent from "@Components/form-check/form-check";
import { Address } from "@Services/customer/customer.types";

export default class UserAddressComponent {
  private view: UserAddressView;
  private countryInput: FormControlComponent;
  private cityInput: FormControlComponent;
  private streetInput: FormControlComponent;
  private postalCodeInput: FormControlComponent;
  private isDefaultAddress: FormCheckComponent;
  private formName: string;

  constructor(header: string, formName: string, address: Address) {
    this.view = new UserAddressView(header);
    this.formName = `${formName}-${header.toLowerCase().replace(" ", "-")}`;
    this.countryInput = new FormControlComponent({
      formName: this.formName,
      inputName: "country",
      labelText: "Country",
      placeholderText: "Enter your country",
      type: "text",
      value: address.country,
      //TODO: SELECT COMPONENT
    });
    this.cityInput = new FormControlComponent({
      formName: this.formName,
      inputName: "city",
      labelText: "City",
      placeholderText: "Enter your city",
      type: "text",
      value: address.city,
    });
    this.streetInput = new FormControlComponent({
      formName: this.formName,
      inputName: "street",
      labelText: "Street",
      placeholderText: "Enter your street",
      type: "text",
      value: address.streetName,
    });
    this.postalCodeInput = new FormControlComponent({
      formName: this.formName,
      inputName: "postal-code",
      labelText: "Postal Code",
      placeholderText: "Enter your postal code",
      type: "text",
      value: address.postalCode,
    });
    this.isDefaultAddress = this.createCheckBox(address.isDefaultAddress);
  }

  createCheckBox(isChecked: boolean) {
    return new FormCheckComponent({
      formName: this.formName,
      inputName: "is-default-address",
      labelText: "Default Address",
      checked: isChecked,
    });
  }

  init() {
    const countryInput = this.countryInput.init();
    const cityInput = this.cityInput.init();
    const streetInput = this.streetInput.init();
    const postalCodeInput = this.postalCodeInput.init();
    const isDefaultAddress = this.isDefaultAddress.init();

    return this.view.render({
      countryInput,
      cityInput,
      streetInput,
      postalCodeInput,
      isDefaultAddress,
    });
  }
}
