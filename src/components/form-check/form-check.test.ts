import FormCheckComponent from "./form-check";
import FormCheckView from "./form-check.view";

describe("FormCheckComponent", () => {
  let component: FormCheckComponent;
  let view: FormCheckView;

  it("should render the view when init method is called", () => {
    const renderedElement = component.init();
    expect(view.render).toHaveBeenCalled();
    expect(renderedElement).toBeInstanceOf(HTMLElement);
  });
});
