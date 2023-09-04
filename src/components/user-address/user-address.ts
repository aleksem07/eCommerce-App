import FormControlComponent from "@Components/form-control/form-control";
import UserAddressView from "./user-address.view";
import FormCheckComponent from "@Components/form-check/form-check";
import { UserAddressProps } from "./user-address.types";

export default class UserAddressComponent {
  private view: UserAddressView;
  private countryInput: FormControlComponent;
  private cityInput: FormControlComponent;
  private streetInput: FormControlComponent;
  private postalCodeInput: FormControlComponent;
  private isDefaultAddress: FormCheckComponent;
  private formName = "user-address";
  private isEditMode = false;

  constructor({ header, address }: UserAddressProps) {
    this.view = new UserAddressView(header);
    this.formName = `${this.formName}-${header.toLowerCase().replace(" ", "-")}`;
    this.countryInput = new FormControlComponent({
      formName: this.formName,
      inputName: "country",
      labelText: "Country",
      placeholderText: "Enter your country",
      value: address.country,
      disabled: !this.isEditMode,
      //TODO: SELECT COMPONENT
    });
    this.cityInput = new FormControlComponent({
      formName: this.formName,
      inputName: "city",
      labelText: "City",
      placeholderText: "Enter your city",
      value: address.city,
      disabled: !this.isEditMode,
    });
    this.streetInput = new FormControlComponent({
      formName: this.formName,
      inputName: "street",
      labelText: "Street",
      placeholderText: "Enter your street",
      value: address.streetName,
      disabled: !this.isEditMode,
    });
    this.postalCodeInput = new FormControlComponent({
      formName: this.formName,
      inputName: "postal-code",
      labelText: "Postal Code",
      placeholderText: "Enter your postal code",
      value: address.postalCode,
      disabled: !this.isEditMode,
    });
    this.isDefaultAddress = this.createCheckBox(address.isDefaultAddress, this.isEditMode);
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
