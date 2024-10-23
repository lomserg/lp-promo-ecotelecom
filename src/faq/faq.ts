import "./faq.css";
const appElement = document.querySelector<HTMLDivElement>("#app");

function getFaqData() {
  fetch("/data/faq.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (appElement) makeFaq(appElement, data);
    })
    .catch((err) => console.log(err));
}
getFaqData();
const makeFaqContainerElement = () => {
  const faqContainer = document.createElement("div");
  faqContainer.classList.add("faq-container");
  return faqContainer;
};

const makeFaqItemElement = (faqItem: { question: string; answer: string }) => {
  const { question, answer } = faqItem;
  console.log(`Question: ${question}, Answer: ${answer}`);
  const faqItemElement = document.createElement("div");
  const faqTitleElement = document.createElement("p");
  const faqContentElement = document.createElement("p");
  const faqTogleBtnElement = document.createElement("button");

  faqTitleElement.textContent = question;
  faqContentElement.innerHTML = answer;

  faqItemElement.classList.add("faq-item");
  faqTitleElement.classList.add("faq-item__title");
  faqContentElement.classList.add("faq-item__content");
  faqTogleBtnElement.classList.add("faq-item__togle");

  faqTitleElement.appendChild(faqTogleBtnElement);
  faqItemElement.appendChild(faqTitleElement);
  faqItemElement.appendChild(faqContentElement);

  faqTogleBtnElement.addEventListener("click", () => {
    faqItemElement.classList.toggle("open");
  });
  return faqItemElement;
};

const makeFaq = (
  parenElement: HTMLDivElement,
  faqItems: { question: string; answer: string }[]
) => {
  const container = makeFaqContainerElement();
  console.log(faqItems);
  faqItems.forEach((item) => {
    const faqItemElement = makeFaqItemElement(item);
    container.append(faqItemElement);
  });
  parenElement.appendChild(container);
};
export default makeFaq;
