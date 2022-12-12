
var idPackages = [],
App = {
    host: location.protocol + "//fe.smotreshka.tv"
},
ApplicationConfig = {
                    host: "//fe.smotreshka.tv",
                };
App.renderChannelsList = function(place, data) {
var channelsPlace = document.getElementById(place),
    innerContent = '<div>';

data.forEach(function (item, i) {
    var imgSrc = item.info.mediaInfo.thumbnails[0].url;
    if(i === 60) {
    }
    innerContent += '<img src="' + imgSrc + '?width=100&height=57" />'; 
    if(i === 59 || i === data.length - 1) {
    }
})
channelsPlace.innerHTML = innerContent;
}
App.renderPackageChannelsList = function(id, content) {
var container = document.querySelector('#pack-' + id + ' .channels_list'),
    btn = document.querySelector('#btn-' + id + '.channels_link'),
    length = 0;
if (!container && !btn) return;
content.length
content.forEach(function(channelId, i) {
    var channels = App.allChannels,
        child = document.createElement('span'),
        img;
    for (var j = 0; j < channels.length; j++) {
        if (channels[j].id === channelId) {
            img = '<img src="' + channels[j].info.mediaInfo.thumbnails[0].url + '?width=100&height=70" />';
             child.innerHTML = img + channels[j].info.metaInfo.title.slice(4);
            container.appendChild(child);
            length++;
            break;
        }
    }
});
if(idPackages) {
                $.each(idPackages, function(key, idPackage) {
                    $.getJSON(ApplicationConfig.host+"/v2/offers/"+idPackage, function(data) {
                        var countChannelItem = $(".about-item[data-package='"+idPackage+"']").find(".channels-amount span");
                        countChannelItem.html(data.content.length);
                    });
                });
            }
}
$(document).ready(function () {
$.ajax({
    url: App.host + "/channels"
}).done(function(data) {
    App.allChannels = data.channels;
//    App.renderChannelsList('all-channels', App.allChannels);
    
    $.ajax({
        url: App.host + "/v2/offers"
    }).done(function(data) {
        var offers = data.offers;
        offers.forEach(function(offer, i) {
            var id = offer.id,
                content = offer.content;
            App.renderPackageChannelsList(offer.id, offer.content);
        })
    });
});
});