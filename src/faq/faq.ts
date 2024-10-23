import "./faq.css";
const appElement = document.querySelector<HTMLDivElement>("#app");

function getFaqData() {
  fetch("/data/faq.json")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (appElement) makeFaq(appElement, data);
    })
    .catch((err) => console.log(err));
}
getFaqData();
const makeFaqContainerElement = () => {
  const faqContainer = document.createElement("div");
  faqContainer.classList.add("accordion");
  return faqContainer;
};

const makeFaqItemElement = (faqItem: { question: string; answer: string }) => {
  const { question, answer } = faqItem;
  // console.log(`Question: ${question}, Answer: ${answer}`);
  const faqItemElement = document.createElement("div");
  const faqItemBodyElement = document.createElement("div");
  const faqTitleElement = document.createElement("div");
  const faqContentElement = document.createElement("div");
  // const faqTogleBtnElement = document.createElement("button");

  faqTitleElement.textContent = question;
  faqContentElement.innerHTML = answer;

  faqItemElement.classList.add("accordion-item");
  faqTitleElement.classList.add("accordion-item-header");
  faqContentElement.classList.add("accordion-item-body-content");
  faqItemBodyElement.classList.add("accordion-item-body");
  // faqTogleBtnElement.classList.add("faq-item__togle");
  faqItemElement.addEventListener("click", () => {
    console.log("active");
    faqTitleElement.classList.toggle("active");
    if (faqTitleElement.classList.contains("active")) {
      faqItemBodyElement.style.maxHeight =
        faqItemBodyElement.scrollHeight + "px";
    } else {
      faqItemBodyElement.style.maxHeight = "0";
    }
  });
  // faqTitleElement.appendChild(faqTogleBtnElement);
  faqItemElement.appendChild(faqTitleElement);
  faqItemBodyElement.appendChild(faqContentElement);
  faqItemElement.appendChild(faqItemBodyElement);
  // faqTogleBtnElement.addEventListener("click", () => {
  //   faqItemElement.classList.toggle("open");
  // });
  return faqItemElement;
};

const makeFaq = (
  parenElement: HTMLDivElement,
  faqItems: { question: string; answer: string }[]
) => {
  const container = makeFaqContainerElement();
  // console.log(faqItems);
  faqItems.forEach((item) => {
    const faqItemElement = makeFaqItemElement(item);
    container.append(faqItemElement);
  });
  parenElement.appendChild(container);
};
export default makeFaq;
