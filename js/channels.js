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
              )}">
                <img src="${
                  item.info.mediaInfo.thumbnails[0].url
                }?width=70&height=40" 
                     title="${item.info.metaInfo.title.slice(4)}" 
                     alt="${item.info.metaInfo.title.slice(4)}" 
                     data-id="${item.id}" />
              </div>`;
            }
          });
        });

        if (box) {
          box.innerHTML += block;
        } else {
          console.warn("Box element is null or undefined.");
        }
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
        } else if (block) {
          let num;
          if (block.textContent.length === 0) {
            num = data.channels.length;
          } else {
            num = block.textContent;
          }
          block.innerHTML = `<strong>${num}</strong> ${declOfNum(num)}`;
        } else {
          console.warn("Block element is null. Skipping update.");
        }
      })
      .catch((error) => console.error("Error fetching pack:", error));
  }

  const channelsItems = document.querySelectorAll(".channels-item");
  channelsItems.forEach(function (item) {
    let blockElement = item.querySelector(".channels-amount");

    // If .channels-amount doesn't exist, create it dynamically
    if (!blockElement) {
      blockElement = document.createElement("div");
      blockElement.className = "channels-amount";
      item.appendChild(blockElement);
    }

    getPack({
      id: item.dataset.package,
      block: blockElement,
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("trigger")) {
      const item = event.target.closest(".channels-item");
      if (!item) {
        console.warn("No .channels-item found for trigger click.");
        return;
      }

      const packageId = item.dataset.package;
      const channelsList = document.querySelector(".channels-list");
      if (!channelsList) {
        console.warn(".channels-list element not found.");
        return;
      }

      channelsList.innerHTML = "";
      getPack({
        id: packageId,
        box: channelsList,
      });
    }
  });
});
