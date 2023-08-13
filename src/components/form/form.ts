import FormView from "./form.view";

export default class FormComponent {
  private view: FormView;

  constructor(name: string) {
    this.view = new FormView(name);
  }

  init() {
    this.view.render();
  }
}
