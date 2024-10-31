// function setElementStyles(elements, cssProperty, value) {
//   elements.forEach((element) => {
//     element.style[cssProperty] = value;
//   });
// }
export function createAndAppendElement(
  parent: HTMLElement,
  tag: string,
  options: {
    className?: string;
    textContent?: string;
    dataPackage?: string;
    href?: string;
    src?: string;
    alt?: string;
  } = {}
) {
  const element = document.createElement(tag);

  if (options.className) {
    element.className = options.className;
  }
  if (options.textContent) {
    element.innerText = options.textContent;
  }

  if (options.href && element instanceof HTMLAnchorElement) {
    element.href = options.href;
  }

  if (options.src && element instanceof HTMLImageElement) {
    element.src = options.src;
    if (options.alt) {
      element.alt = options.alt;
    }
  }

  if (options.src && element instanceof HTMLIFrameElement) {
    element.src = options.src;
  }

  parent.appendChild(element);
  return element;
}
export function createElement(
  tag: string,
  options: {
    className?: string | string[];
    textContent?: string;
    dataPackage?: string;
    href?: string;
    id?: string;
  } = {}
) {
  const element = document.createElement(tag);
  if (options.className) {
    element.className = Array.isArray(options.className)
      ? options.className.join(" ")
      : options.className;
  }
  if (options.textContent) {
    element.innerText = options.textContent;
  }
  if (options.id) {
    element.id = options.id;
  }
  if (options.dataPackage) {
    element.setAttribute("data-package", options.dataPackage);
  }
  return element;
}
// export default function createAndAppendElement(
//   parent: HTMLElement,
//   tag: string,
//   options: {
//     className?: string;
//     textContent?: string;
//     id?: string;
//     styles?: Partial<CSSStyleDeclaration>;
//   } = {}
// ) {
//   const element = document.createElement(tag);

//   // Set className if provided
//   if (options.className) {
//     element.className = options.className;
//   }

//   // Set textContent if provided
//   if (options.textContent) {
//     element.textContent = options.textContent;
//   }

//   // Set id if provided
//   if (options.id) {
//     element.id = options.id;
//   }

//   // Set styles if provided
//   if (options.styles) {
//     Object.assign(element.style, options.styles); // Apply styles to the element
//   }

//   // Append the new element to the parent
//   parent.appendChild(element);
//   return element;
// }
