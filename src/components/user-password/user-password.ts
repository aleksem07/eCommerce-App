import FormControlComponent from "@Components/form-control/form-control";
import UserPasswordView from "./user-password.view";

export default class UserPasswordComponent {
  private view: UserPasswordView;
  private newPasswordInput: FormControlComponent;
  private confirmPasswordInput: FormControlComponent;
  private formName: string;

  constructor(formName: string, isEditMode: boolean) {
    this.view = new UserPasswordView();
    this.formName = formName;

    this.newPasswordInput = new FormControlComponent({
      formName: this.formName,
      inputName: "new-password",
      labelText: "New Password",
      placeholderText: "Enter a new password",
      type: "password",
      disabled: !isEditMode,
    });

    this.confirmPasswordInput = new FormControlComponent({
      formName: this.formName,
      inputName: "confirm-password",
      labelText: "Confirm Password",
      placeholderText: "Confirm the new password",
      type: "password",
      disabled: !isEditMode,
    });
  }

  init() {
    const newPasswordInput = this.newPasswordInput.init();
    const confirmPasswordInput = this.confirmPasswordInput.init();

    return this.view.render({ newPasswordInput, confirmPasswordInput });
  }
}
