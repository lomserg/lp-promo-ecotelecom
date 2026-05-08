function fetchChannels() {
  return fetch("https://fe.smotreshka.tv/channels")
    .then((res) => res.json())
    .then((data) => data.channels)
    .catch((err) => {
      console.error("Error fetching all channels:", err);
      return [];
    });
}

// Функция получения списка channelId пакета по id
function getPackage(id) {
  return fetch(`https://fe.smotreshka.tv/offers/v3/${id}/showcase-channels`)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching package:", err);
      return { channels: [] };
    });
}

// Основная функция загрузки и фильтрации каналов пакета
function fetchData(id) {
  return Promise.all([getPackage(id), fetchChannels()]).then(
    ([packageData, allChannels]) => {
      const packageChannelIds = new Set(
        packageData.channels.map((c) => c.channelId)
      );
      const filteredChannels = allChannels.filter((ch) =>
        packageChannelIds.has(ch.id)
      );
      return filteredChannels;
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".bg-modal");
  const modalContent = modal.querySelector(".modal-content");
  const closeBtn = modal.querySelector(".modal-btn");
  function openModal(html) {
    modalContent.innerHTML = html;
    document.body.classList.add("my-body-noscroll-class");
    modal.classList.add("active");
  }

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.classList.remove("my-body-noscroll-class");
  });

  // Клик по локальным NTV каналам
  document.querySelectorAll(".ntv_channels .channels_link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      fetch("./data/ntv_light.json")
        .then((res) => res.json())
        .then((ntvChannels) => {
          const listHtml = `<ul class="channels-list">
            ${ntvChannels.map((ch) => `<li>${ch}</li>`).join("")}
          </ul>`;
          openModal(listHtml);
        })
        .catch((err) => {
          openModal("<p>Ошибка загрузки НТВ каналов</p>");
          console.error("Ошибка загрузки ntv_light.json:", err);
        });
    });
  });

  // Клик по каналам пакета (Смотрёшка API)
  document
    .querySelectorAll(".channels-item[data-package] .channels_link.trigger")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const packageId = btn.closest(".channels-item").dataset.package;
        if (!packageId) return;

        openModal("<p>Загрузка каналов...</p>");

        fetchData(packageId)
          .then((channels) => {
            if (channels.length === 0) {
              openModal("<p>Каналы не найдены.</p>");
              return;
            }
            const block = channels
              .map((item) => {
                const rawTitle = item.info?.metaInfo?.title || "Канал";
                const title = rawTitle.replace(/^\d+_/, "");
                const thumb = item.info?.mediaInfo?.thumbnails?.[0]?.url || "";
                return `<div class="channels_item" data-name="${title}">
              <img src="${thumb}?width=70&height=40" title="${title}" alt="${title}" data-id="${item.id}" />
              <p>${title}</p>
            </div>`;
              })
              .join("");
            openModal(block);
          })
          .catch((err) => {
            openModal("<p>Ошибка загрузки каналов с API.</p>");
            console.error(err);
          });
      });
    });

  // Закрытие модалки по клику на фон
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.classList.remove("my-body-noscroll-class");
    }
  });
});
