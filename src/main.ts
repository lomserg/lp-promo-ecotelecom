import "./style.css";
import makeFaq from "./faq/faq";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div>
<h1>test</h1>
</div>
`;

const appElement = document.querySelector<HTMLDivElement>("#app");

// Ensure that appElement exists and is not null
if (appElement) {
  makeFaq(appElement, [
    {
      question: "Сколько стоит подключение интернета?",
      answer:
        "Подключение осуществляется бесплатно. Мастер протягивает кабель до вашего этажа, заводит его в квартиру, подключает к компьютеру и настраивает сеть",
    },
    {
      question: "Сэкономьте до 20% с абонементом на услуги «Экотелеком»",
      answer:
        "Подключение осуществляется бесплатно. Мастер протягивает кабель до вашего этажа, заводит его в квартиру, подключает к компьютеру и настраивает сеть",
    },
    {
      question: "Списание денежных средств со счета",
      answer:
        "Подключение осуществляется бесплатно. Мастер протягивает кабель до вашего этажа, заводит его в квартиру, подключает к компьютеру и настраивает сеть",
    },
  ]);
} else {
  console.error("Element with ID 'app' not found.");
}
