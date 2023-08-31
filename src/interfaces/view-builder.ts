interface ElementOptions {
  id?: string;
  classes?: string[];
  dataset?: Record<string, string>[];
}

export class ViewBuilder {
  createElement<T extends HTMLElement>(
    tag: string,
    { id, classes, dataset }: ElementOptions = {}
  ): T {
    const element = document.createElement(tag);

    if (id) {
      element.id = id;
    }

    if (classes?.length) {
      element.classList.add(...classes);
    }

    if (dataset) {
      for (const data of dataset) {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            element.dataset[key] = data[key];
          }
        }
      }
    }

    return element as T;
  }

  getElement<T extends HTMLElement>(selector: string) {
    const element = document.querySelector(selector);

    return element as T;
  }

  createIcon(name: string) {
    return this.createElement("i", {
      classes: ["bi", name],
    });
  }

  appendTo(parentSelector: string, element: HTMLElement) {
    const parent = document.querySelector(parentSelector);

    if (parent) {
      parent.appendChild(element);
    }
  }

  isHTMLElement(element: unknown): element is HTMLElement {
    return !!element && element instanceof HTMLElement;
  }
}
