import LoginFormView from "./login-form.view";
// import * as yup from "yup";
// import { object, string, number, date, InferType } from "../../../node_modules/yup/index";
export default class LoginFormComponent {
  private view: LoginFormView;

  constructor() {
    this.view = new LoginFormView();
    this.view.submitFormListener(this.submitFormListener.bind(this));
  }
  submitFormListener(event: SubmitEvent) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(this.view.form);
    // const emailInput = this.view.getElement("#login_email-input") as ;
    // eslint-disable-next-line no-console
    console.log((this.view.emailInput as HTMLInputElement).value);
    // eslint-disable-next-line no-console
    console.log((this.view.passwordInput as HTMLInputElement).value);
    // console.log("submitFormListener");
  }
  init() {
    this.view.render();
  }
}
