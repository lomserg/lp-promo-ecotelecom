// Fetching the 'id' from the URL
let currentTarifId: number | null = null;

// Define the Tariff interface
interface Tariff {
  id: number;
  name: string;
  promo?: boolean;
  speed: number;
  price?: number;
  description: string;
  tv: boolean;
  dataPackage: string | null;
  channels: number;
  movie: string | null;
}

// Function to fetch Tariff data by ID and display it
function getTariffsData(id: number) {
  const baseUrl = import.meta.env.BASE_URL || "/";

  // Fetch data from JSON
  fetch(`${baseUrl}data/tarif.json`)
    .then((response) => response.json())
    .then((data: Tariff[]) => {
      // Find the tariff with the matching ID
      const tariff = data.find((item) => item.id === id);
      if (tariff) {
        // Display the tariff details on the page
        document.querySelector("#tariffName")!.textContent = tariff.name;
        document.querySelector("#tariffDescription")!.textContent =
          tariff.description;
        document.querySelector(
          "#tariffPrice"
        )!.textContent = `Price: $${tariff.price}`;
        // Display any other relevant details
      } else {
        console.error("Tariff not found");
      }
    })
    .catch((err) => console.error("Error fetching data:", err));
}

// Main script logic
document.addEventListener("DOMContentLoaded", () => {
  const tarifID = new URLSearchParams(window.location.search).get("id");
  const id = parseInt(tarifID || "", 10);

  // Redirect if ID is invalid (NaN or out of range)
  if (isNaN(id) || id < 1 || id > 8) {
    window.location.href = "./index.html";
    return;
  }

  // Set currentTarifId and fetch the data
  currentTarifId = id;
  getTariffsData(currentTarifId);
});
