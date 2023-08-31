import FormControlComponent from "@Components/form-control/form-control";
import UserInfoView from "./user-info.view";

export default class UserInfoComponent {
  private view: UserInfoView;
  private formName: string;
  private firstNameInput: FormControlComponent;
  private lastNameInput: FormControlComponent;
  private emailInput: FormControlComponent;
  private dateOfBirthInput: FormControlComponent;

  constructor(formName: string) {
    this.formName = formName;
    this.view = new UserInfoView();
    this.firstNameInput = new FormControlComponent({
      formName: this.formName,
      inputName: "first-name",
      labelText: "First Name",
      placeholderText: "Enter your first name",
    });
    this.lastNameInput = new FormControlComponent({
      formName: this.formName,
      inputName: "last-name",
      labelText: "Last Name",
      placeholderText: "Enter your last name",
    });
    this.emailInput = new FormControlComponent({
      formName: this.formName,
      inputName: "email",
      labelText: "Email",
      placeholderText: "Enter your email",
      type: "email",
    });
    this.dateOfBirthInput = new FormControlComponent({
      formName: this.formName,
      inputName: "date-of-birth",
      labelText: "Date of Birth",
      placeholderText: "Enter your date of birth",
      type: "date",
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
