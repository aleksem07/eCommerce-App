import ProductCardComponent from "./product-card";
import { ProductCardProps } from "./product-card.types";

describe("ProductCardComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductCardComponent({
      title: "title",
      description: "description",
      imageUrl: "imageUrl",
    });
    expect(instance).toBeInstanceOf(ProductCardComponent);
  });

  it("should render a card with the correct structure", () => {
    const props: ProductCardProps = {
      title: "Sample Title",
      description: "Sample Description",
      imageUrl: "sample-image.jpg",
    };
    const productCard = new ProductCardComponent(props);

    const productCardEl = productCard.init();

    expect(productCardEl.tagName).toBe("DIV");
    expect(productCardEl.classList.contains("card")).toBe(true);

    const imageElement = productCardEl.querySelector(".card-img-top") as HTMLImageElement;
    expect(imageElement?.tagName).toBe("IMG");
    expect(imageElement?.src).toContain("sample-image.jpg");

    const cardBody = productCardEl.querySelector(".card-body");
    expect(cardBody?.tagName).toBe("DIV");

    const titleElement = cardBody?.querySelector(".card-title");
    expect(titleElement?.textContent).toBe("Sample Title");

    const descriptionElement = cardBody?.querySelector(".card-text");
    expect(descriptionElement?.textContent).toBe("Sample Description");
  });
});
