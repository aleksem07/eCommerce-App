import FormControlComponent from "@Components/form-control/form-control";
import UserInfoView from "./user-info.view";
import { Customer } from "@Services/customer/customer.types";

export default class UserInfoComponent {
  private view: UserInfoView;
  private formName: string;
  private firstNameInput: FormControlComponent;
  private lastNameInput: FormControlComponent;
  private emailInput: FormControlComponent;
  private dateOfBirthInput: FormControlComponent;
  private isEditMode = false;

  constructor(formName: string, customer: Customer) {
    this.formName = formName;
    this.view = new UserInfoView();
    this.firstNameInput = new FormControlComponent({
      formName: this.formName,
      inputName: "first-name",
      labelText: "First Name",
      placeholderText: "Enter your first name",
      value: customer?.firstName,
      disabled: !this.isEditMode,
    });
    this.lastNameInput = new FormControlComponent({
      formName: this.formName,
      inputName: "last-name",
      labelText: "Last Name",
      placeholderText: "Enter your last name",
      value: customer?.lastName,
      disabled: !this.isEditMode,
    });
    this.emailInput = new FormControlComponent({
      formName: this.formName,
      inputName: "email",
      labelText: "Email",
      placeholderText: "Enter your email",
      type: "email",
      value: customer?.email,
      disabled: !this.isEditMode,
    });
    this.dateOfBirthInput = new FormControlComponent({
      formName: this.formName,
      inputName: "date-of-birth",
      labelText: "Date of Birth",
      placeholderText: "Enter your date of birth",
      type: "date",
      value: customer?.dateOfBirth,
      disabled: !this.isEditMode,
    });
  }

  init() {
    return this.view.render({
      firstNameInput: this.firstNameInput.init(),
      lastNameInput: this.lastNameInput.init(),
      emailInput: this.emailInput.init(),
      dateOfBirthInput: this.dateOfBirthInput.init(),
    });
  }
}
