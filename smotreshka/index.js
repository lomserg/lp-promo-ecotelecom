import { fetchData, countGenres } from "./channels.js";
import { createPopup } from "./popup.js";

const tarifElements = document.querySelectorAll(".tarif");
const body = document.querySelector("body");
tarifElements.forEach((element) => {
  element.addEventListener("click", function () {
    const dataPackageValue = this.getAttribute("data-package");
    console.log("Clicked Package ID:", dataPackageValue);
    const loadingPopup = document.createElement("div");
    loadingPopup.classList.add("popup");
    loadingPopup.innerHTML = `<div class="popup-content"><p>Загрузка...</p> <div class="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div></div>
     `;
    body.appendChild(loadingPopup);
    // Call fetchData and handle the returned data
    fetchData(dataPackageValue)
      .then((data) => {
        const { intersection, genreCounts } = data;
        console.log(genreCounts);
        console.log("Intersection:", intersection);
        // for (const genre in genreCounts) {
        //   console.log(`${genre}: ${genreCounts[genre]}`);
        // }
        loadingPopup.remove();
        body.append(createPopup(genreCounts, intersection));
        // You can pass the fetched data to createPopup or do further processing
        // createPopup(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
});
