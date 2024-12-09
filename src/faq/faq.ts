import "./faq.css";

const appElement = document.querySelector<HTMLDivElement>("#app");

export async function getFaqData(): Promise<HTMLElement> {
  const baseUrl = import.meta.env.BASE_URL || "/"; // Use the base URL from Vite env
  const faqSection = document.createElement("section");
  faqSection.classList.add("faq__section");

  try {
    const response = await fetch(`${baseUrl}data/faq.json`);
    const data = await response.json();

    if (appElement) {
      makeFaq(faqSection, data); // Process and populate the FAQ section
    }
  } catch (err) {
    console.error("Error fetching FAQ data:", err);
  }

  return faqSection; // Return the FAQ section (even if empty on error)
}

const makeFaqContainerElement = () => {
  const faqContainer = document.createElement("div");
  faqContainer.classList.add("accordion");
  return faqContainer;
};

const makeFaqItemElement = (faqItem: { question: string; answer: string }) => {
  const { question, answer } = faqItem;

  const faqItemElement = document.createElement("div");
  const faqItemBodyElement = document.createElement("div");
  const faqTitleElement = document.createElement("div");
  const faqContentElement = document.createElement("div");

  faqTitleElement.textContent = question;
  faqContentElement.innerHTML = answer;

  faqItemElement.classList.add("accordion-item");
  faqTitleElement.classList.add("accordion-item-header");
  faqContentElement.classList.add("accordion-item-body-content");
  faqItemBodyElement.classList.add("accordion-item-body");

  faqItemElement.addEventListener("click", () => {
    faqTitleElement.classList.toggle("active");
    if (faqTitleElement.classList.contains("active")) {
      faqItemBodyElement.style.maxHeight =
        faqItemBodyElement.scrollHeight + "px";
    } else {
      faqItemBodyElement.style.maxHeight = "0";
    }
  });

  faqItemElement.appendChild(faqTitleElement);
  faqItemBodyElement.appendChild(faqContentElement);
  faqItemElement.appendChild(faqItemBodyElement);

  return faqItemElement;
};

const makeFaq = (
  parentElement: HTMLElement,
  faqItems: { question: string; answer: string }[]
) => {
  const container = makeFaqContainerElement();

  faqItems.forEach((item) => {
    const faqItemElement = makeFaqItemElement(item);
    container.append(faqItemElement);
  });

  parentElement.appendChild(container);
};

export default getFaqData;
