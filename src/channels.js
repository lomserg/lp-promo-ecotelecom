document.addEventListener("DOMContentLoaded", function () {
  function declOfNum(n) {
    return n % 10 === 1 && n % 100 !== 11
      ? "канал"
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? "канала"
        : "каналов";
  }

  function getAll(channels, box) {
    fetch("//fe.smotreshka.tv/channels")
      .then((response) => response.json())
      .then((data) => {
        let block = "";

        data.channels.forEach(function (item) {
          channels.forEach((el) => {
            if (item.id === el.channelId) {
              block += `<div class="channels_item" data-name="${item.info.metaInfo.title.slice(
                4
              )}"><img src="${
                item.info.mediaInfo.thumbnails[0].url
              }?width=70&height=40" title="${item.info.metaInfo.title.slice(
                4
              )}" alt="${item.info.metaInfo.title.slice(4)}" data-id="${
                item.id
              }" /></div>`;
            }
          });
        });
        box.innerHTML += block;
      })
      .catch((error) => console.error("Error fetching channels:", error));
  }

  function getPack(options) {
    const id = options.id,
      box = options.box,
      block = options.block;

    fetch(`//fe.smotreshka.tv/offers/v3/${id}/showcase-channels`)
      .then((response) => response.json())
      .then((data) => {
        if (box) {
          getAll(data.channels, box);
        } else {
          let num;
          if (block && block.textContent) {
            num = block.textContent;
          } else {
            num = data.channels.length.toString();
          }
          if (block) {
            block.innerHTML = `<strong>${num}</strong> ${declOfNum(num)}`;
          }
        }
      })
      .catch((error) => console.error("Error fetching pack:", error));
  }

  const channelsItems = document.querySelectorAll(".channels-item");
  channelsItems.forEach(function (item) {
    getPack({
      id: item.dataset.package,
      block: item.querySelector(".channels-amount"),
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("trigger")) {
      const packageId = event.target.closest(".channels-item").dataset.package;
      const channelsList = document.querySelector(".channels-list");
      channelsList.innerHTML = "";
      getPack({
        id: packageId,
        box: channelsList,
      });
    }
  });
});
