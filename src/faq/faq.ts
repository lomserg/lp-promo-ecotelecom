function getFaqData() {
  fetch("../../public/data/faq.json")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

const makeFaqContainerElement = () => {
  const faqContainer = document.createElement("div");
  faqContainer.classList.add("faqContainer");
  return faqContainer;
};

const makeFaq = (
  parenElement: HTMLDivElement,
  faqItems: { question: string; answer: string }[]
) => {
  const container = makeFaqContainerElement();
  console.log(faqItems);
  parenElement.appendChild(container);
};
export default makeFaq;
