import FormControlComponent from "@Components/form-control/form-control";
import UserAddressView from "./user-address.view";
import FormCheckComponent from "@Components/form-check/form-check";

export default class UserAddressComponent {
  private view: UserAddressView;
  private countryInput: FormControlComponent;
  private cityInput: FormControlComponent;
  private streetInput: FormControlComponent;
  private postalCodeInput: FormControlComponent;
  private isDefaultAddress: FormCheckComponent;

  constructor(header: string) {
    this.view = new UserAddressView(header);

    this.countryInput = new FormControlComponent({
      formName: "user-address",
      inputName: "country",
      labelText: "Country",
      placeholderText: "Enter your country",
      type: "text",
    });

    this.cityInput = new FormControlComponent({
      formName: "user-address",
      inputName: "city",
      labelText: "City",
      placeholderText: "Enter your city",
      type: "text",
    });

    this.streetInput = new FormControlComponent({
      formName: "user-address",
      inputName: "street",
      labelText: "Street",
      placeholderText: "Enter your street",
      type: "text",
    });

    this.postalCodeInput = new FormControlComponent({
      formName: "user-address",
      inputName: "postal-code",
      labelText: "Postal Code",
      placeholderText: "Enter your postal code",
      type: "text",
    });

    this.isDefaultAddress = this.createCheckBox();
  }

  createCheckBox() {
    return new FormCheckComponent({
      formName: "user-address",
      inputName: "is-default-address",
      labelText: "Default Address",
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
