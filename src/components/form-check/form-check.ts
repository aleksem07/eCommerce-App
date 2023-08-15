import FormCheckView from "./form-check.view";

export default class FormCheckComponent {
  private view: FormCheckView;

  constructor(login: string, password: string) {
    this.view = new FormCheckView(login, password);
    this.view.checkboxListener(this.checkboxHandler.bind(this));
  }

  async checkboxHandler(status: boolean) {
    this.view.handleChecboxResult(status);
  }

  init() {
    return this.view.render();
  }
}
