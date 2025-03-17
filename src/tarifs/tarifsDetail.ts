import { createElement } from "../utils/createElement";

interface Tariff {
  id: number;
  name: string;
  description: string;
  price: number;
  speed: number;
  tv: boolean;
  channels: number | null;
}

// Function to create and render the details of a specific tariff
function createTarifPage(id: number): void {
  const baseUrl = import.meta.env.BASE_URL || "/";

  // Fetch data dynamically based on ID
  fetch(`${baseUrl}data/tarif.json`)
    .then((response) => response.json())
    .then((data: Tariff[]) => {
      const tariff = data.find((item) => item.id === id);

      if (tariff) {
        // Render the tariff details
        renderTariffDetail(tariff);
      } else {
        console.error("Tariff not found!");
        renderError("Tariff not found.");
      }
    })
    .catch((err) => {
      console.error("Error fetching tariff data:", err);
      renderError("Failed to load tariff data.");
    });
}

// Function to render the details of a tariff
function renderTariffDetail(tariff: Tariff): void {
  // Clear the current page content
  const appElement = document.querySelector<HTMLDivElement>("#detail");
  if (appElement) appElement.innerHTML = "";

  // Create and populate the detail section
  const section = document.createElement("div");
  section.classList.add("detail__section");

  const tariffName = createElement("div", {
    className: "tariffName",
    textContent: `Name: ${tariff.name}`,
  });
  const tariffDescription = createElement("div", {
    className: "tariffDescription",
    textContent: `Description: ${tariff.description}`,
  });
  const tariffPrice = createElement("div", {
    className: "tariffPrice",
    textContent: `Price: ${tariff.price} ₽/мес`,
  });
  const tariffSpeed = createElement("div", {
    className: "tariffSpeed",
    textContent: `Speed: ${tariff.speed} Мбит/с`,
  });
  const tariffChannels = tariff.tv
    ? createElement("div", {
        className: "tariffChannels",
        textContent: `Channels: ${tariff.channels || 0} TV Channels`,
      })
    : null;

  // Append elements to the section
  section.appendChild(tariffName);
  section.appendChild(tariffDescription);
  section.appendChild(tariffPrice);
  section.appendChild(tariffSpeed);
  if (tariffChannels) section.appendChild(tariffChannels);

  // Append the section to the app element
  appElement?.appendChild(section);
}

// Function to render an error message
function renderError(message: string): void {
  const appElement = document.querySelector<HTMLDivElement>("#detail");
  if (appElement) {
    appElement.innerHTML = `<div class="error">${message}</div>`;
  }
}

// Function to load the tariff page based on the URL query string
function loadTariffPage(): void {
  // Parse the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id") || "", 10);

  if (id) {
    createTarifPage(id);
  } else {
    renderError("Invalid or missing tariff ID.");
  }
}

// Export the functions for use in other files
export { createTarifPage, loadTariffPage };
