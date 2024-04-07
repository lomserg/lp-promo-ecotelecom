export class FormItem {
  elDiv: HTMLDivElement;
  htmlFor: string;
  textContent: string;
  className: string;
  placeHolder: string;

  constructor(
    htmlFor: string,
    textContent: string,
    className: string,
    placeHolder: string
  ) {
    this.elDiv = document.createElement("div");
    this.htmlFor = htmlFor;
    this.textContent = textContent;
    this.className = className;
    this.placeHolder = placeHolder;
    this.render();
  }

  render() {
    const elLabel = document.createElement("label");
    elLabel.textContent = this.textContent;
    elLabel.setAttribute("for", this.htmlFor); // 'for' is a reserved keyword, so we use setAttribute to set the 'for' attribute.

    const elInput = document.createElement("input");
    elInput.placeholder = this.placeHolder;

    this.elDiv.classList.add(this.className);
    this.elDiv.append(elLabel, elInput);
  }

  returnElement() {
    return this.elDiv;
  }
}
