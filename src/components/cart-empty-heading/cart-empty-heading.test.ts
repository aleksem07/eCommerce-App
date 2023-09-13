import CartEmptyHeadingComponent from "./cart-empty-heading";

describe("CartEmptyHeadingComponent", () => {
  let cartEmptyHeadingComponent: CartEmptyHeadingComponent;
  beforeEach(() => {
    cartEmptyHeadingComponent = new CartEmptyHeadingComponent();
  });

  it("should render a <h2> element with the correct text content", () => {
    const element = cartEmptyHeadingComponent.init();
    expect(element.tagName).toBe("H2");
    expect(element.textContent).toBe("Your cart is empty");
  });
});
