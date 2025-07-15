export function createPopup(genreObjects, channels) {
  const popup = document.createElement("div");
  const popupContent = document.createElement("div");

  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.classList.add("close-btn");
  popup.classList.add("popup");
  popupContent.classList.add("popup-content");
  const divGeneres = document.createElement("div");
  divGeneres.classList.add("genre");
  const divChannels = document.createElement("div");
  divChannels.classList.add("channels");
  divChannels.classList.add("parent");

  // Create Genre Buttons
  for (const genre in genreObjects) {
    const button = document.createElement("button");
    button.classList.add("button-genre");
    button.textContent = `${genre}: ${genreObjects[genre]}`;
    button.dataset.genre = genre; // Store genre for filtering

    button.addEventListener("click", (e) => {
      filterChannelsByGenre(e, genre, channels, divChannels);
    });

    divGeneres.appendChild(button);
  }
  // Create "ALL" button
  const buttonAll = document.createElement("button");
  buttonAll.classList.add("button-genre");
  buttonAll.textContent = `Все: ${channels.length}`;
  buttonAll.addEventListener("click", (e) => {
    renderChanels(channels, divChannels);
  });
  divGeneres.prepend(buttonAll);
  renderChanels(channels, divChannels);
  // Create Channel List
  renderChanels(channels, divChannels);
  // Create Channel List

  popupContent.appendChild(closeBtn);
  popupContent.appendChild(divGeneres);
  popupContent.appendChild(divChannels);
  popup.appendChild(popupContent);
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.remove();
    }
  });
  closeBtn.addEventListener("click", (e) => {
    if (e.target === closeBtn) {
      popup.remove();
    }
  });
  return popup;
}
function filterChannelsByGenre(e, genre, channels, divChannels) {
  const filteredChamels = channels.filter((chanel) => {
    return chanel.info.metaInfo.genres.includes(genre);
  });
  console.log(filteredChamels);
  console.log(`Filtering channels by genre: ${genre}`);
  renderChanels(filteredChamels, divChannels);
}
function renderChanels(channels, divChannels) {
  divChannels.innerHTML = "";
  channels.forEach((channel) => {
    const div = document.createElement("div");
    div.classList.add("child");
    const img = document.createElement("img");
    img.src = channel.info.mediaInfo.thumbnails[0].url + "?width=70&height=40";
    console.log(channel.info.mediaInfo.thumbnails[0]);
    div.appendChild(img);
    div.dataset.genres = channel.info.metaInfo.genres.join(","); // Store genres

    divChannels.appendChild(div);
  });
}
