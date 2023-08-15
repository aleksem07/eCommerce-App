import FormCheckComponent from "./form-check";
import FormCheckView from "./form-check.view";

describe("FormCheckComponent", () => {
  let formCheckComponent: FormCheckComponent;

  beforeEach(() => {
    // Create a new instance of FormCheckComponent before each test
    formCheckComponent = new FormCheckComponent({ formName: "testForm", inputName: "testInput" });
  });

  it("should initialize the FormCheckComponent with the provided formName and inputName", () => {
    expect(formCheckComponent["view"]).toBeInstanceOf(FormCheckView);
    expect(formCheckComponent["view"]["formName"]).toBe("testForm");
    expect(formCheckComponent["view"]["inputName"]).toBe("testInput");
  });

  it("should render the view when init() is called", () => {
    const renderedElement = formCheckComponent.init();
    expect(renderedElement).toBeInstanceOf(HTMLElement);
  });
});
