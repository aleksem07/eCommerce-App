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

  getElement(selector: string) {
    return document.querySelector(selector);
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

  insertBefore(parentSelector: string, element: HTMLElement, elem: string) {
    const parent = document.querySelector(parentSelector);
    const eleme = document.querySelector(elem);

    if (parent && elem) {
      parent.insertBefore(element, eleme);
    }
  }
}
