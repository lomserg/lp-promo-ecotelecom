import getTarifsData from "./tarifs";

import { Tariff } from "./tarifs";
function createTarifPage(id: number) {
  const baseUrl = import.meta.env.BASE_URL || "/";
  fetch(`${baseUrl}data/tarif.json`)
    .then((response) => response.json())
    .then((data: Tariff[]) => {
      const tariff = data.find((item) => item.id === id);
      console.log("it works");
      if (!tariff) {
        document.querySelector("#app")!.innerHTML = "<p>Тариф не найден</p>";
        return;
      }

      // **Clear previous content**
      const app = document.querySelector("#app");
      if (app) app.innerHTML = ""; // Removes previous list of tariffs

      // **Create new content**
      const detailsContainer = document.createElement("div");
      detailsContainer.classList.add("tariff-details");

      const title = document.createElement("h1");
      title.textContent = tariff.name;

      const price = document.createElement("p");
      price.textContent = `Цена: ${tariff.price} ₽/мес`;

      const speed = document.createElement("p");
      speed.textContent = `Скорость: ${tariff.speed} Мбит/с`;

      const description = document.createElement("p");
      description.textContent = tariff.description;

      const backButton = document.createElement("button");
      backButton.textContent = "Назад";
      backButton.addEventListener("click", () => {
        history.pushState({}, "", "/");
        loadTariffsList(); // Function to reload the main list of tariffs
      });

      detailsContainer.append(title, price, speed, description, backButton);
      app?.appendChild(detailsContainer);
    })
    .catch((err) => console.error("Ошибка загрузки тарифа:", err));
}

function loadTariffsList() {
  const app = document.querySelector("#app");
  if (app) app.innerHTML = ""; // Clear previous content

  const tariffsSection = document.createElement("div");
  tariffsSection.classList.add("tariffs-section");
  if (app) app.appendChild(tariffsSection);

  getTarifsData(tariffsSection); // Re-fetch and display the tariff list
}
export { createTarifPage, loadTariffsList };
