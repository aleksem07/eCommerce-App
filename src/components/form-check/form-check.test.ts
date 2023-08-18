import FormCheckComponent from "./form-check";
import FormCheckView from "./form-check.view";

describe("FormCheckComponent", () => {
  let component: FormCheckComponent;
  let view: FormCheckView;

  beforeEach(() => {
    const props = {
      formName: "yourFormName",
      inputName: "yourInputName",
    };
    component = new FormCheckComponent(props);
    view = component["view"];
  });

  it("should render the view when init method is called", () => {
    const renderedElement = component.init();
    expect(view.render()).toBe(renderedElement);
    expect(renderedElement).toBeInstanceOf(HTMLElement);
  });
});
