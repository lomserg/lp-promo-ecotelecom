export function fetchChannels() {
  return fetch(`https://fe.smotreshka.tv/channels`)
    .then((res) => res.json())
    .then((data) => {
      return data.channels;
    })
    .catch((error) => console.error("Error fetching channels:", error));
}

export function showData(data) {
  data.forEach((element) => {
    allChannel = element;
    getTitle(element.info.metaInfo.title);
  });
}

export function getTitle(title) {
  console.log(title.slice(4));
}

export function getPackage(id) {
  return fetch(`https://fe.smotreshka.tv/offers/v3/${id}/showcase-channels`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

export function fetchData(id) {
  return Promise.all([getPackage(id), fetchChannels()])
    .then(([packageData, allChannels]) => {
      const intersection = allChannels.filter((element) =>
        packageData.channels.find((channel) => element.id === channel.channelId)
      );
      const channelMap = new Map(
        packageData.channels.map((channel) => [channel.channelId, channel])
      );
      // Альтернативный вариант intersection с помощью Map
      // const matchChannels = allChannels
      //   .map((element) => channelMap.get(element.id))
      //   .filter(Boolean);

      // console.log(matchChannels);

      return { intersection, genreCounts: countGenres(intersection) }; // Return data for further use
    })
    .catch((err) => {
      console.log("Error fetching data:", err);
      throw err; // Ensure errors propagate
    });
}
export function countGenres(channels) {
  // Check if channels is an array
  if (!Array.isArray(channels)) {
    console.error("Error: channels is not an array", channels);
    return {}; // Return an empty object to avoid errors
  }

  const genreCount = {};

  channels.forEach((channel) => {
    if (channel.info && channel.info.metaInfo && channel.info.metaInfo.genres) {
      channel.info.metaInfo.genres.forEach((genre) => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    }
  });

  return genreCount;
}
