export interface Params {
  tag: string;
  classNames: string | string[];
  textContent?: string; // Making textContent optional
  callback?: Function;
}

export default class ElementCreator {
  params: Params;
  element: HTMLElement | null;
  constructor(param: Params) {
    this.params = param;
    this.element = null;
    this.createElement(param);
  }

  createElement(param: Params) {
    this.element = document.createElement(param.tag);
    this.setCssClasses(param.classNames);
    this.setTextContent(param.textContent);
  }

  getElement() {
    return this.element;
  }

  setCssClasses(cssClasses: string | string[] = []) {
    if (this.element) {
      if (typeof cssClasses === "string") {
        this.element.classList.add(cssClasses);
      } else {
        cssClasses.forEach((cssClass) => this.element!.classList.add(cssClass));
      }
    }
  }
  setTextContent(text = "") {
    if (this.element) this.element.textContent = text;
  }
}
