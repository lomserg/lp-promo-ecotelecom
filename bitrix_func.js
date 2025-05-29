"use strict";
var checkMobile = function checkMobile() {
  var isMobile =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return (isMobile = document.body.clientWidth <= 980);
};
checkMobile();

if (ieVerification()) {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", "./assets/css/ie.css");
  document.getElementsByTagName("head")[0].appendChild(link);
  var swiper = document.createElement("script");
  swiper.setAttribute("type", "text/javascript");
  swiper.setAttribute(
    "src",
    "/local/templates/eco_telnet/assets/js/ie-additional-swiper.min.js"
  );
  document.getElementsByTagName("head")[0].appendChild(swiper);
} else {
  var _swiper = document.createElement("script");
  _swiper.setAttribute("type", "text/javascript");
  _swiper.setAttribute(
    "src",
    "/local/templates/eco_telnet/assets/js/additional-swiper.min.js"
  );
  document.getElementsByTagName("head")[0].appendChild(_swiper);
}

var summary;
var calc;
var preloader;

document.addEventListener("DOMContentLoaded", function () {
  try {
    preloader = new Preloader();
  } catch (e) {
    console.error("Ошибка при создании Preloader:", e);
  }

  window.addEventListener(
    "resize",
    debounce(function () {
      try {
        checkMobile();
      } catch (e) {
        console.error("Ошибка в checkMobile:", e);
      }
    }, 150)
  );

  try {
    if (navigator.userAgent.match("MSIE 10.0;")) {
      $("html").addClass("ie10");
      PointerEventsPolyfill.initialize({});
    }

    PointerEventsPolyfill.initialize({});
  } catch (e) {
    console.error("Ошибка в PointerEventsPolyfill:", e);
  }

  // Функция безопасного вызова
  function safeInit(fn, name) {
    try {
      fn();
    } catch (e) {
      console.error("Ошибка в " + name + ":", e);
    }
  }

  // Инициализации
  safeInit(initInput, "initInput");
  safeInit(initMenu, "initMenu");
  safeInit(initHeader, "initHeader");
  safeInit(initAdditional, "initAdditional");
  safeInit(initVacansy, "initVacansy");
  safeInit(initEquipmentDetailed, "initEquipmentDetailed");
  safeInit(initQuestions, "initQuestions");
  safeInit(initPayment, "initPayment");
  safeInit(initFeedback, "initFeedback");
  safeInit(initForm, "initForm");
  safeInit(initSwitch, "initSwitch");
  safeInit(initFooter, "initFooter");
  safeInit(initInstructions, "initInstructions");
  safeInit(initTv, "initTv");
  safeInit(initNavigation, "initNavigation");
  safeInit(initTariffSliders, "initTariffSliders");
  safeInit(initExtraSlider, "initExtraSlider");
  safeInit(initInternetTariffs, "initInternetTariffs");

  try {
    objectFitImages();
  } catch (e) {
    console.error("Ошибка в objectFitImages:", e);
  }

  if (document.querySelector("#map") !== null) {
    safeInit(initMapYa, "initMapYa");
  }

  // Инициализация калькулятора с задержкой
  setTimeout(function () {
    try {
      calc = new Calculator();
      calc.init();
    } catch (e) {
      console.error("Ошибка в Calculator:", e);
    }
  }, 150);

  // Клики по доп. пакетам
  $(".extra__package-item")
    .off("click")
    .on("click", function () {
      try {
        var input = $(this).find("input");
        if (input.is(":checked")) {
          input.prop("checked", false).change();
          $(".extra__package-item").removeClass("package_is-active is-active");
        } else {
          $(this).parents(".extra__item_ntv").addClass("is-active");
          input.prop("checked", true).change();
          $(".extra__package-item").removeClass("package_is-active is-active");
          $(this).addClass("package_is-active is-active");
        }

        calc.calculate();
        calc.checkTariff();
        calc.checkExtra();
      } catch (e) {
        console.error("Ошибка при переключении доп. пакета:", e);
      }
    });
});

// Выключаем прелоадер только после полной загрузки
window.addEventListener("load", function () {
  try {
    if (preloader) preloader.off();
  } catch (e) {
    console.error("Ошибка при отключении прелоадера:", e);
  }
});
$(document).ready(function () {
  setTimeout(function () {
    initPopups();
    initSelect("select");
  }, 0);
});

// Debounce
function debounce(func, delay) {
  var inDebounce = undefined;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(inDebounce);
    return (inDebounce = setTimeout(function () {
      return func.apply(context, args);
    }, delay));
  };
}

// Throttle
function throttle(func, limit) {
  var inThrottle = undefined;
  return function () {
    var args = arguments;
    var context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      return setTimeout(function () {
        return (inThrottle = false);
      }, limit);
    }
  };
}

var getParents = function getParents(elem, selector) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s);
        var i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  var parents = [];
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (selector) {
      if (elem.matches(selector)) {
        parents.push(elem);
      }
    } else {
      parents.push(elem);
    }
  }
  return parents;
};

function ieVerification() {
  var ie =
    navigator.userAgent.toLowerCase().indexOf("msie") != -1
      ? parseInt(navigator.userAgent.toLowerCase().split("msie")[1])
      : false;
  var ie11 = !!window.MSInputMethodContext && !!document.documentMode;
  var edge = /Edge\/\d./i.test(navigator.userAgent);
  var isIE = ie || ie11 || edge ? true : false;
  return isIE;
}
("use strict");

function initPopups() {
  $("a.showcase__button, .summary__button").click(function (event) {
    event.preventDefault();
    if ($(".popup_feedback").length) {
      $(".popup_feedback").addClass("popup_is-active");
      $("body").addClass("body_no-scroll");
    }
  });

  // $('body').on('click', '.popup', function(e) {
  //   var div = $('.popup').find('.popup__container');

  //     if (!div.is(e.target) // если клик был не по нашему блоку
  //     && div.has(e.target).length === 0) { // и не по его дочерним элементам
  //       $('.popup').removeClass('popup_is-active');
  //       $('body').removeClass('body_no-scroll');
  //     }
  // });

  // Popup для медиаконтента
  $(".license__item").click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    var index = $(this).attr("data-index");
    $(".owl-carousel").trigger("to.owl.carousel", [index, 0, true]);
    if ($(".popup_media").length) {
      $(".popup_media").addClass("popup_is-active");
      $("body").addClass("body_no-scroll");
    }
  });

  $(document).click(function (e) {
    var containerList = [
      $(".popup__container"),
      $(".button"),
      $(".television__difference"),
      $(".tariffs__channels-content"),
    ];
    var checklist = 0;
    containerList.forEach(function (elem) {
      if (!elem.is(e.target) && elem.has(e.target).length === 0) {
        checklist++;
        // $('.popup').removeClass('popup_is-active');
        $("body").removeClass("body_no-scroll");
      }

      checklist == containerList.length
        ? ($(".popup").removeClass("popup_is-active"),
          $("body").removeClass("body_no-scroll"),
          $(".tariffs__channels").removeClass("tariffs__channels_is-active"))
        : "";
    });
  });

  $(".popup").click(function (event) {
    var target = $(event.target);
    if (target.is(".popup_is-active")) {
      $(".popup_media").removeClass("popup_is-active");
      $("body").removeClass("body_no-scroll");
    }
  });

  $(".popup_media .popup__list").owlCarousel({
    items: 1,
    center: true,
    nav: false,
    dots: false,
    loop: false,
    margin: 30,
  });

  $(".popup__navigation-back").click(function () {
    $(".popup_media .popup__list").trigger("prev.owl.carousel");
  });

  $(".popup__navigation-next").click(function () {
    $(".popup_media .popup__list").trigger("next.owl.carousel");
  });

  $(".popup .popup__scroll").bind(
    "mousewheel DOMMouseScroll",
    function (event) {
      var scrollTo = null;

      if (event.type == "mousewheel") {
        scrollTo = event.originalEvent.wheelDelta * -1;
      } else if (event.type == "DOMMouseScroll") {
        scrollTo = 40 * event.originalEvent.detail;
      }

      if (scrollTo) {
        event.preventDefault();
        $(this).scrollTop(scrollTo + $(this).scrollTop());
      }
    }
  );

  // Попап сравнение телевидения
  $(".television__difference")
    .off()
    .click(function () {
      if ($(".popup_difference-tv").length) {
        $(".popup_difference-tv").addClass("popup_is-active");
        $("body").addClass("body_no-scroll");
      }
    });

  // Попап с формой обратной связи
  $(".button_form")
    .off()
    .click(function () {
      if ($(".popup_feedback").length !== 0) {
        $(".popup_feedback").addClass("popup_is-active");
        $("body").addClass("body_no-scroll");
      }
    });

  // Попап форма обратной связи для бизнеса
  $(".button_business")
    .off()
    .click(function () {
      if ($(".popup_feedback-business").length !== 0) {
        $(".popup_feedback-business").addClass("popup_is-active");
        $("body").addClass("body_no-scroll");
      }
    });

  $(".button_contract")
    .off()
    .click(function () {
      if ($(".popup_feedback-contract").length !== 0) {
        $(".popup_feedback-contract").addClass("popup_is-active");
        $("body").addClass("body_no-scroll");
      }
    });

  $(".popup__close")
    .off()
    .on("click", function (event) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
      $(this).parents(".popup").removeClass("popup_is-active");
      $("body").removeClass("body_no-scroll");
    });
}

("use strict");

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Preloader = (function () {
  function Preloader() {
    _classCallCheck(this, Preloader);
  }

  _createClass(Preloader, [
    {
      key: "off",
      value: function off() {
        var animation = new TimelineLite({ delay: 0 });
        animation
          .to(
            document.querySelectorAll(".preloader__spin"),
            0.4,
            { opacity: 0 },
            0
          )
          .to(document.querySelectorAll(".preloader"), 0.4, { opacity: 0 }, 0.1)
          .to(
            document.querySelectorAll(".preloader"),
            0,
            { display: "none" },
            0.6
          );
      },
    },
    {
      key: "on",
      value: function on() {
        var animation = new TimelineLite({ delay: 0 });
        animation
          .to(
            document.querySelectorAll(".preloader"),
            0,
            { display: "block" },
            0
          )
          .to(
            document.querySelectorAll(".preloader__spin"),
            0.4,
            { opacity: 1 },
            0.1
          )
          .to(document.querySelectorAll(".preloader"), 0.4, { opacity: 1 }, 0);
      },
    },
  ]);

  return Preloader;
})();
("use strict");

// begin

function initInput() {
  $(".input_phone").inputmask({
    mask: "+7 (699) 999-99-99",
    definitions: { 6: { validator: "[1-6]|[9]" } },
    showMaskOnHover: false,
    showMaskOnFocus: true,
  });
  $(".input_fio").inputmask("Regex", {
    regex: "[А-Яа-я ]*",
    showMaskOnHover: false,
    showMaskOnFocus: true,
  });
}

if (checkMobile()) {
  $(".contacts-map__wrap_map").insertAfter($(".contacts-map__select_central"));
}

$(".filter__item").each(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).addClass("filter__item_is-active");
  }
});

$(".filter__input_address").keyup(function () {
  //$(this).parents('.filter__wrapper').find('.input__dropdown_street').addClass('input__dropdown_is-active');
  if ($(this).find("input").val().length == 0) {
    $(this)
      .parents(".filter__wrapper")
      .find(".input__dropdown_street")
      .removeClass("input__dropdown_is-active");
  }
});

$(".filter__input_home").keyup(function () {
  //$(this).parents('.filter__wrapper').find('.input__dropdown_house').addClass('input__dropdown_is-active');
  if ($(this).find("input").val().length == 0) {
    $(this)
      .parents(".filter__wrapper")
      .find(".input__dropdown_house")
      .removeClass("input__dropdown_is-active");
  }
});

$(".filter__input input").blur(function () {
  $(this)
    .parents(".filter__wrapper")
    .find(".input__dropdown")
    .removeClass("input__dropdown_is-active");
});

$(".filter__input_address .input__source").on("keypress", function () {
  var that = this;

  setTimeout(function () {
    var res = /[^А-я 0-9]/g.exec(that.value);
    that.value = that.value.replace(res, "");
  }, 0);
});

function updateSliders() {
  var tariffs = $(".tariffs__service-content");
  tariffs.trigger("refresh.owl.carousel");
  var tariffsAddit = $(".tariffs__additional");
  tariffsAddit.trigger("refresh.owl.carousel");
  var extraSlider = $(".extra__cards");
  var extraPackages = $(".extra__package-list");
  if (extraSlider !== undefined) {
    extraSlider.trigger("refresh.owl.carousel");
  }
  if (extraPackages !== undefined) {
    extraPackages.trigger("refresh.owl.carousel");
  }
}

function reinitBonusTariffs(items) {
  var tariffsAddit = $(".tariffs__additional");
  tariffsAddit.trigger("destroy.owl.carousel");
  tariffsAddit.owlCarousel({
    items: items,
    margin: 30,
    // autoWidth: true,
    // mouseDrag: false,
    responsive: {
      1366: {
        items: items,
      },
      690: {
        items: 3,
        stagePadding: 0,
        autoWidth: true,
      },
      400: {
        items: 2,
        stagePadding: 0,
        autoWidth: true,
      },
      0: {
        items: 2,
        autoWidth: true,
      },
    },
  });
}

function reinitExtraSlider() {
  var items = $(".extra__cards").attr("data-items");
  var extraSlider = $(".extra__cards");
  extraSlider.trigger("destroy.owl.carousel");
  extraSlider.owlCarousel({
    items: items,
    margin: 30,
    // mouseDrag: false,
    // autoWidth: true,
    responsive: {
      1024: {
        items: items,
      },
      768: {
        items: 4,
        mouseDrag: true,
        stagePadding: 0,
      },
      690: {
        items: 3,
        mouseDrag: true,
        stagePadding: 0,
        autoWidth: true,
      },
      500: {
        items: 2,
        mouseDrag: true,
        stagePadding: 0,
        autoWidth: true,
      },
      400: {
        items: 2,
        mouseDrag: true,
        autoWidth: true,
        stagePadding: 0,
      },
      0: {
        mouseDrag: true,
        autoWidth: true,
        items: 2,
      },
    },
  });
}

function updateTariffs() {
  var tariffHeight = $(
    ".tariffs__item_is-active .tariffs__content-wrap"
  ).outerHeight(true);
  $(".tariffs__item_is-active .tariffs__content").css("height", tariffHeight);
}

// end
("use strict");

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

//begin

var extraRadioList = [].concat(
  _toConsumableArray(document.querySelectorAll(".extra__list-item"))
);

extraRadioList.forEach(function (extraRadio) {
  extraRadio.addEventListener("change", function () {
    for (var i = 0; i < extraRadioList.length; i++) {
      extraRadioList[i].classList.remove("extra__list-item_is-active");
    }
    extraRadio.classList.add("extra__list-item_is-active");
  });
});

// Выбор тарифа для домашнего телефона
// Переключение основных карточек
$(".extra__block").click(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).find("input").prop("checked", false).change();
    $(".extra__block").removeClass("extra__block_is-active");
    $(".extra__block").removeClass("is-active");
    calc.calculate();
    calc.checkTariff();
    calc.checkExtraPhones();
  } else {
    $(".extra__block input").each(function () {
      if ($(this).is(":checked")) {
        $(this).prop("checked", false).change();
      }
    });
    $(this).find("input").prop("checked", true).change();
    $(".extra__block").removeClass("extra__block_is-active");
    $(".extra__block").removeClass("is-active");
    $(this).addClass("extra__block_is-active");
    $(this).addClass("is-active");
    $(".extra__item_telephone.calc").addClass("is-active");
    calc.calculate();
    calc.checkTariff();
    calc.checkExtraPhones();
  }
});

$(".extra__service-item.equip").click(function (e) {
  if (!$(e.target).hasClass("input__source")) {
    if ($(this).find("input").is(":checked")) {
      $(this).find("input").prop("checked", false).change();
      $(this).removeClass("is-active");
      calc.calculate($(this));
      calc.checkTariff();
      calc.checkExtra();
    } else {
      $(".extra__service-item input").each(function () {
        if ($(this).is(":checked")) {
          $(this).prop("checked", false).change();
        }
      });
      $(this).find("input").prop("checked", true).change();
      $(".extra__service-item").removeClass("extra__service-item_is-active");
      $(".extra__service-item").removeClass("is-active");
      $(this).addClass("is-active");
      $(this).parents(".extra__item_ntv").addClass("is-active");
      calc.calculate($(this));
      calc.checkTariff();
      calc.checkExtra();
    }
  }
});

$(".table__toggle").click(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).find("input").prop("checked", false);
  } else {
    $(this).find("input").prop("checked", true);
  }
});

// Задание высоты для блока со слайдером

function setExtraHeight() {
  var extra = $(".extra__packages_auto-height");
  var headHeight = $(
    ".extra__packages_auto-height .extra__packages-head"
  ).height();
  var sliderHeight = $(
    ".extra__packages_auto-height .extra__package-item"
  ).height();
  $(extra).css("height", headHeight + sliderHeight);
}

if (checkMobile() == true) {
  setExtraHeight();
}

function initExtraSlider() {
  var items = $(".extra__cards").attr("data-items");
  var extraSlider = $(".extra__cards").owlCarousel({
    items: items,
    margin: 30,
    // center: true,
    // mouseDrag: false,
    // autoWidth: true,
    responsive: {
      1024: {
        items: items,
      },
      768: {
        items: 4,
        mouseDrag: true,
        stagePadding: 0,
      },
      690: {
        items: 3,
        mouseDrag: true,
        stagePadding: 0,
        autoWidth: true,
      },
      500: {
        items: 2,
        mouseDrag: true,
        stagePadding: 0,
        autoWidth: true,
      },
      400: {
        items: 2,
        mouseDrag: true,
        autoWidth: true,
        stagePadding: 0,
      },
      0: {
        mouseDrag: true,
        autoWidth: true,
        items: 2,
      },
    },
  });

  if (
    $(".extra__slider_ntv .extra__package-item").length > 3 ||
    checkMobile() == true
  ) {
    var extraPackages = $(".extra__package-list").owlCarousel({
      items: 3,
      // margin: 30,
      mouseDrag: true,
      // autoWidth: true,
      responsive: {
        1024: {
          items: 3,
          margin: 30,
        },
        500: {
          items: 2,
          mouseDrag: true,
          margin: 30,
          autoWidth: true,
        },
        400: {
          items: 2,
          mouseDrag: true,
          margin: 30,
          autoWidth: true,
        },
        0: {
          mouseDrag: true,
          margin: 30,
          autoWidth: true,
          items: 2,
        },
      },
    });

    $("#extra__ntv-plus_left").click(function () {
      extraPackages.trigger("prev.owl.carousel");
    });

    $("#extra__ntv-plus_right").click(function () {
      extraPackages.trigger("next.owl.carousel");
    });
  }

  $(".extra__nav-item_right").click(function () {
    extraSlider.trigger("next.owl.carousel");
  });

  $(".extra__nav-item_left").click(function () {
    extraSlider.trigger("prev.owl.carousel");
  });
}

// end
("use strict");

// Выбор интернет-тарифа (Галочка)
$(".tariffs__select").click(function () {
  if ($(this).hasClass("tariffs__select_is-active")) {
    $(this).removeClass("tariffs__select_is-active");
  } else {
    $(".tariffs__select").removeClass("tariffs__select_is-active");
    $(this).addClass("tariffs__select_is-active");
  }
});
// .. Либо клик по шапке
// $('.tariffs__head').click(function () {
//   if ($(event.target).hasClass('tariffs__extra-unit_link')) {
//     // Открытие popup'а с ТВ каналами (и анимация через each)
//     $(this).parents('.tariffs__item').find('.tariffs__channels-column .tariffs__channels-item').each(function (i) {
//       var $this = $(this)
//       setTimeout(function () {
//         $this.addClass('tariffs__channels-item_is-active')
//       }, 30 * i)
//     })
//     $(this).parents('.tariffs__item').find('.tariffs__channels').addClass('tariffs__channels_is-active')
//     return false
//   }
//   if ($(this).find('.tariffs__select').hasClass('tariffs__select_is-active')) {
//     $(this).find('.tariffs__select').removeClass('tariffs__select_is-active')
//     summary.hide();
//   } else {
//     $('.tariffs__select').removeClass('tariffs__select_is-active')
//     $(this).find('.tariffs__select').addClass('tariffs__select_is-active')
//     summary.show();
//     if (checkMobile() == true) {
//       summary.init();
//     }
//   }
// })

// Открытие popup'а с ТВ каналами (и анимация через each)
$(".tariffs__cell-item_tv .tariffs__extra").click(function () {
  var _self = $(this);
  var id = _self
    .parents(".tariffs__item")
    .find(".tariffs__channels-list")
    .attr("data_merge");
  if (id != "0") {
    _self
      .parents(".tariffs__item")
      .find(".tariffs__channels-list .app__preloader")
      .css("opacity", "");
    _self
      .parents(".tariffs__item")
      .find(".tariffs__channels-list .app__preloader")
      .css("display", "");
    _self
      .parents(".tariffs__item")
      .find(".tariffs__channels-list .app__preloader .preloader__spin")
      .css("opacity", "");
    _self
      .parents(".tariffs__item")
      .find(".tariffs__channels")
      .addClass("tariffs__channels_is-active");
    $("body").addClass("body_no-scroll");
    $.ajax({
      url: "/get_ajax_connect.php",
      type: "POST",
      data: {
        TYPE: "tarif_channels",
        ID: id,
      },
      success: function (data) {
        _self
          .parents(".tariffs__item")
          .find(".tariffs__channels-list")
          .attr("data_merge", "0");
        _self
          .parents(".tariffs__item")
          .find(".tariffs__channels-list")
          .html(data);
        _self
          .parents(".tariffs__item")
          .find(".tariffs__channels-list")
          .css("height", "");

        _self
          .parents(".tariffs__item")
          .find(".tariffs__channels-column .tariffs__channels-item")
          .each(function (i) {
            var $this = $(this);
            setTimeout(function () {
              $this.addClass("tariffs__channels-item_is-active");
            }, 30 * i);
          });
      },
    });
  } else {
    _self
      .parents(".tariffs__item")
      .find(".tariffs__channels-column .tariffs__channels-item")
      .each(function (i) {
        var $this = $(this);
        setTimeout(function () {
          $this.addClass("tariffs__channels-item_is-active");
        }, 30 * i);
      });
    $("body").addClass("body_no-scroll");
    _self
      .parents(".tariffs__item")
      .find(".tariffs__channels")
      .addClass("tariffs__channels_is-active");
  }
  return false;
});

// Раскрытие элемента с интернет-тарифом
$(".tariffs__dropdown").click(function (event) {
  if ($(this).parents(".tariffs__item").hasClass("tariffs__item_is-active")) {
    $(this).parents(".tariffs__item").removeClass("tariffs__item_is-active");

    TweenMax.to(
      $(this).parents(".tariffs__item").find(".tariffs__content"),
      0.4,
      {
        height: 0,
        ease: Power1.easeInOut,
      },
      0
    );
  } else {
    var tariffsContentHeight = $(this)
      .parents(".tariffs__item")
      .find(".tariffs__content-wrap")
      .outerHeight(true);
    $(".tariffs__item").removeClass("tariffs__item_is-active");
    $(this).parents(".tariffs__item").addClass("tariffs__item_is-active");

    TweenMax.to(
      $(".tariffs__item").find(".tariffs__content"),
      0.4,
      {
        height: 0,
        ease: Power1.easeInOut,
      },
      0
    );

    TweenMax.to(
      $(this).parents(".tariffs__item").find(".tariffs__content"),
      0.4,
      {
        height: tariffsContentHeight,
        ease: Power1.easeInOut,
      },
      0
    );

    var $this = $(this);

    setTimeout(function () {
      $("html, body").animate(
        {
          scrollTop: $this.parents(".tariffs__item").offset().top,
        },
        400,
        "easeInOutQuart"
      );
    }, 450);
  }
});

// Закрытие popup'а с тв-каналами
$(".tariffs__channels-close").click(function () {
  if (
    $(this)
      .parents(".tariffs__channels")
      .hasClass("tariffs__channels_is-active")
  ) {
    $(".tariffs__channels").removeClass("tariffs__channels_is-active");
    $("body").removeClass("body_no-scroll");
  }
});

$(".equip-tv .tariffs__equipment-wrap").click(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).find("input").prop("checked", false).change();
    $(this).removeClass("is-active");
    calc.calculate($(this));
    calc.checkTariff($(this));
  } else {
    $(this)
      .parents(".tariffs__additional")
      .find(".equip-tv .tariffs__equipment-wrap")
      .each(function () {
        if ($(this).hasClass("is-active")) {
          $(this).removeClass("is-active");
          $(this).find("input").prop("checked", false).change();
        }
      });

    $(this).find("input").prop("checked", true).change();
    $(this).addClass("is-active");
    calc.calculate($(this));
    calc.checkTariff($(this));
  }
});
$(".equip-router .tariffs__equipment-wrap").click(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).find("input").prop("checked", false).change();
    $(this).removeClass("is-active");
    calc.calculate($(this));
    calc.checkTariff($(this));
  } else {
    $(this)
      .parents(".tariffs__additional")
      .find(".equip-router .tariffs__equipment-wrap")
      .each(function () {
        if ($(this).hasClass("is-active")) {
          $(this).removeClass("is-active");
          $(this).find("input").prop("checked", false).change();
          calc.calculate($(this));
          calc.checkTariff($(this));
        }
      });

    $(this).find("input").prop("checked", true).change();
    $(this).addClass("is-active");
    calc.calculate($(this));
    calc.checkTariff($(this));
  }
});

function initTariffSliders() {
  var tariffs = $(".tariffs__service-content");
  tariffs.owlCarousel({
    items: 5,
    margin: 20,
    mouseDrag: false,
    // autoWidth: true,
    // stagePadding: 50,
    responsive: {
      1366: {
        items: 5,
      },
      1024: {
        items: 4,
        autoWidth: true,
      },
      768: {
        items: 4,
        stagePadding: 0,
        autoWidth: true,
      },
      690: {
        items: 3,
        stagePadding: 0,
        autoWidth: true,
      },
      400: {
        items: 2,
        stagePadding: 0,
        autoWidth: true,
      },
      0: {
        items: 1,
        stagePadding: 0,
        autoWidth: true,
      },
    },
  });

  tariffs.each(function () {
    var containerWidth = $(this).width();
    var sliderWidth = $(this).find(".owl-stage").width();
    if (sliderWidth <= containerWidth) {
      $(this).prev(".tariffs__nav").addClass("tariffs__nav_is-hidden");
    }
  });
  var tariffsAddit = $(".tariffs__additional").owlCarousel({
    items: 5,
    margin: 30,
    // autoWidth: true,
    // stagePadding: 50,
    // mouseDrag: false,
    responsive: {
      1366: {
        items: 5,
      },
      1024: {
        items: 4,
      },
      768: {
        items: 4,
        stagePadding: 0,
      },
      690: {
        items: 3,
        autoWidth: true,
        stagePadding: 0,
      },
      400: {
        items: 2,
        autoWidth: true,
        stagePadding: 0,
      },
      0: {
        autoWidth: true,
        items: 2,
      },
    },
  });

  $(".tariffs__nav_service .tariffs__nav-item_right").click(function () {
    tariffs.trigger("next.owl.carousel");
  });

  $(".tariffs__nav_service .tariffs__nav-item_left").click(function () {
    tariffs.trigger("prev.owl.carousel");
  });

  $(".tariffs__nav_additional .tariffs__nav-item_right").click(function () {
    $(".tariffs__additional").trigger("next.owl.carousel");
  });

  $(".tariffs__nav_additional .tariffs__nav-item_left").click(function () {
    $(".tariffs__additional").trigger("prev.owl.carousel");
  });

  $(".tariffs__service-content_disabled").trigger("destroy.owl.carousel");
}

function initInternetTariffs() {
  var inetTariffs = $(".tariffs_internet .tariffs__additional");
  inetTariffs.trigger("destroy.owl.carousel");
  inetTariffs.owlCarousel({
    items: 4,
    margin: 30,
    // autoWidth: true,
    // stagePadding: 50,
    // mouseDrag: false,
    responsive: {
      1366: {
        items: 4,
      },
      690: {
        items: 3,
        autoWidth: true,
        stagePadding: 0,
      },
      400: {
        items: 2,
        autoWidth: true,
        stagePadding: 0,
      },
      0: {
        autoWidth: true,
        items: 2,
      },
    },
  });
}
("use strict");

function initTariffTip() {
  $(".tariffs__info").on("mouseenter", function () {
    var item = $(this).closest(".tariffs__item");
    item.find(".tariffs__head").css("z-index", "101");
  });

  $(".tariffs__info").on("mouseleave", function () {
    var item = $(this).closest(".tariffs__item");
    item.find(".tariffs__head").css("z-index", "");
  });
}

initTariffTip();

$(".package").click(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).find("input").prop("checked", false);
    $(this).removeClass("package_is-active is-active");
    calc.calculate();
    calc.checkTariff($(this));
  } else {
    $(this).find("input").prop("checked", true);
    // $('.tariffs__list-item').removeClass('package_is-active is-active');
    $(this).addClass("package_is-active is-active");
    calc.calculate();
    calc.checkTariff($(this));
  }
});
/*
$('.extra__package-item').off('click').on('click', function () {
    if ($(this).find('input').is(':checked')) {
        $(this).find('input').prop('checked', false).change();
        $('.extra__package-item').removeClass('package_is-active is-active');
        calc.calculate();
        calc.checkTariff();
        calc.checkExtra();
    } else {
        $(this).parents('.extra__item_ntv').addClass('is-active');
        $(this).find('input').prop('checked', true).change();
        $('.extra__package-item').removeClass('package_is-active is-active');
        $(this).addClass('package_is-active is-active');
        calc.calculate();
        calc.checkTariff();
        calc.checkExtra();
    }
});*/

$(".tip").click(function (e) {
  e.stopImmediatePropagation();
});

$(".tip-trigger")
  .off()
  .click(function (e) {
    e.stopImmediatePropagation();
    $(".tip").removeClass("tip_is-active");
    $(this).parent().find(".tip").addClass("tip_is-active");
  });

$(".tip__close")
  .off()
  .click(function () {
    $(this).parent().removeClass("tip_is-active");
  });

$(document).mouseup(function (event) {
  if (
    $(event.target).closest(".tip").length ||
    $(event.target).closest(".tip-trigger").length
  )
    return;
  $(".tip").removeClass("tip_is-active");
  event.stopPropagation();
});
("use strict");

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

if (document.querySelector(".wp-scroll")) {
  []
    .concat(_toConsumableArray(document.querySelectorAll(".wp-scroll")))
    .forEach(function (element) {
      scrollTipMenu(element);
    });
}

function scrollTipMenu(element) {
  var navigationNode = element.querySelector(".wp-scroll__nav"),
    formNode = element.querySelector(".wp-scroll__form");

  var scrollWidth = formNode.scrollWidth;

  var containerWidth = void 0,
    scrollLeft = void 0;

  setTimeout(function () {
    containerWidth = element.clientWidth;
    scrollLeft = scrollWidth - containerWidth;

    if (scrollWidth > containerWidth) {
      navigationNode.classList.add("wp-scroll__nav_show_forward");
    }

    formNode.addEventListener("scroll", scrollCheck, true);
  }, 0);

  window.addEventListener(
    "resize",
    debounce(function () {
      containerWidth = element.clientWidth;
      scrollLeft = scrollWidth - containerWidth;

      if (scrollWidth > containerWidth) {
        navigationNode.classList.add("wp-scroll__nav_show_forward");
      } else {
        navigationNode.classList.remove("wp-scroll__nav_show_forward");
      }
    }, 150)
  );

  function scrollCheck() {
    if (formNode.scrollLeft <= 5) {
      navigationNode.classList.add("wp-scroll__nav_show_forward");
      navigationNode.classList.remove("wp-scroll__nav_show_backward");
    } else if (formNode.scrollLeft >= scrollLeft - 5) {
      navigationNode.classList.add("wp-scroll__nav_show_backward");
      navigationNode.classList.remove("wp-scroll__nav_show_forward");
    } else {
      navigationNode.classList.add("wp-scroll__nav_show_forward");
      navigationNode.classList.add("wp-scroll__nav_show_backward");
    }
  }

  var navItemsList = navigationNode.querySelectorAll(".wp-scroll__nav-item");

  for (var i = 0; i < navItemsList.length; i++) {
    navItemsList[i].addEventListener("click", function () {
      if (this.classList.contains("wp-scroll__nav-item_forward")) {
        var changeTo = formNode.scrollLeft + 300;
        animateScroll("left", formNode, changeTo, 250);
      }
      if (this.classList.contains("wp-scroll__nav-item_backward")) {
        var _changeTo = formNode.scrollLeft - 300;
        animateScroll("left", formNode, _changeTo, 250);
      }
    });
  }
}

function animateScroll(direction, element, to, duration) {
  var start = void 0;

  switch (direction) {
    case "left":
      start = element.scrollLeft;
      break;
    case "top":
      start = element.scrollTop;
      break;
    default:
      start = element.scrollTop;
  }

  var change = to - start,
    currentTime = 0,
    increment = 20;

  var animateScroll = function animateScroll() {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
("use strict");

window.onload = function () {
  if (!ieVerification()) {
    var showcaseSlider = new Swiper("#showcaseSlider", {
      direction: "horizontal",
      autoplay: true,
      loop: true,
      speed: 800,
      parallax: true,
      // simulateTouch: false,
      observer: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    $(".instructions__slider").each(function () {
      var instructionsSlider = new Swiper($(this), {
        direction: "horizontal",
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
          nextEl: ".instructions__slider-arrow_right",
          prevEl: ".instructions__slider-arrow_left",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 25,
          },
          440: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
          },
        },
      });
    });

    var newsSlider = new Swiper("#newsSlider", {
      direction: "horizontal",
      slidesPerView: "auto",
      pagination: {
        el: ".news__slider-counter",
        type: "fraction",
      },
      slidesPerGroup: 4,
      navigation: {
        nextEl: ".news__button_next",
        prevEl: ".news__button_prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: "auto",
          slidesPerGroup: 2,
        },
        768: {
          slidesPerView: "auto",
          slidesPerGroup: 1,
        },
        640: {
          slidesPerView: "auto",
          slidesPerGroup: 1,
        },
        440: {
          slidesPerView: "auto",
          slidesPerGroup: 1,
        },
      },
    });
  } else {
    console.log("ie");
    var _showcaseSlider = new Swiper("#showcaseSlider", {
      direction: "horizontal",
      loop: false,
      speed: 800,
      parallax: true,
      simulateTouch: false,
      observer: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
    });

    $(".instructions__slider").each(function () {
      var instructionsSlider = new Swiper($(this), {
        direction: "horizontal",
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: ".instructions__slider-arrow_right",
          prevEl: ".instructions__slider-arrow_left",
        },
      });
    });

    $(".instructions__slider").each(function () {
      var instructionsSlider = new Swiper($(this), {
        direction: "horizontal",
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: ".instructions__slider-arrow_right",
          prevEl: ".instructions__slider-arrow_left",
        },
      });
    });

    var _newsSlider = new Swiper("#newsSlider", {
      direction: "horizontal",
      slidesPerView: 4,
      spaceBetween: 30,
      pagination: {
        el: ".news__slider-counter",
        type: "fraction",
      },
      slidesPerGroup: 4,
      nextButton: ".news__button_next",
      prevButton: ".news__button_prev",
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 25,
        },
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        440: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
      },
    });
  }
};
("use strict");

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Select = (function () {
  function Select(name, index) {
    _classCallCheck(this, Select);

    this.name = name;
    this.index = index;
    this.status = false;
    this.selected = 0;
    this.disabled = false;
    this.value = 0;
    this.$select = {};
    this.$styledSelected = {};
    this.$styledList = {};
  }

  _createClass(
    Select,
    [
      {
        key: "init",
        value: function init() {
          this.$select = $(this.name);

          var selectBlockName = this.$select.data("block"),
            selectTheme = this.$select.data("theme"),
            selectSize = this.$select.data("size");

          this.$select
            .removeClass(selectBlockName + "__select")
            .addClass("select__source")
            .wrap(
              '<div class="' +
                selectBlockName +
                "__select select select_theme_" +
                selectTheme +
                " select_size_" +
                selectSize +
                '"></div>'
            )
            .after('<div class="select__selected"></div>');

          if (this.$select.attr("disabled")) {
            this.$select.parent().addClass("select_is-disabled");
            this.disabled = true;
          }

          this.$styledSelected = this.$select.next("div.select__selected");

          this.$styledSelected.text(
            this.$select.children("option").eq(0).text()
          );

          this.$styledList = $("<ul />", {
            class: "select__options",
          }).insertAfter(this.$styledSelected);

          for (var i = 0; i < this.$select.children("option").length; i++) {
            $("<li />", {
              class: "select__options-item",
              text: this.$select.children("option").eq(i).text(),
              "data-value": this.$select.children("option").eq(i).val(),
            }).appendTo(this.$styledList);
          }
        },
      },
      {
        key: "state",
        value: function state() {
          console.info(
            "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 " +
              this.index +
              " \u0441\u0435\u043B\u0435\u043A\u0442\u0430:"
          );
          console.info(
            "\u0412\u044B\u0431\u0440\u0430\u043D \u043F\u0443\u043D\u043A\u0442 - " +
              this.selected
          );
          console.info(
            "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u0443\u043D\u043A\u0442\u0430 - " +
              this.value
          );
          console.info(
            "\u0421\u0435\u043B\u0435\u043A\u0442 \u043E\u0442\u043A\u0440\u044B\u0442 - " +
              this.status
          );
          console.info(
            "\u0421\u0435\u043B\u0435\u043A\u0442 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D - " +
              this.disabled
          );
        },
      },
      {
        key: "choose",
        value: function choose(option, val, text) {
          this.selected = option;
          if (val == undefined) {
            val = this.$styledList.children().eq(option).data("value");
          }
          if (text == undefined) {
            text = this.$styledList.children().eq(option).text();
          }
          this.value = val;
          this.$select.val(val).change();
          this.$styledSelected.text(text);
        },
      },
      {
        key: "setDisabled",
        value: function setDisabled() {
          this.disabled = true;
          this.$select.prop("disabled", true);
          this.$styledSelected.parent().addClass("select_is-disabled");
        },
      },
      {
        key: "setEnabled",
        value: function setEnabled() {
          this.disabled = false;
          this.$select.prop("disabled", false);
          this.$styledSelected.parent().removeClass("select_is-disabled");
        },
      },
      {
        key: "getValue",
        value: function getValue() {
          return this.value;
        },
      },
    ],
    [
      {
        key: "close",
        value: function close(select) {
          select.status = false;
          select.$select.parent().removeClass("select_is-active");

          $(document).off("click");
        },
      },
      {
        key: "open",
        value: function open(select) {
          if (!select.status) {
            select.status = true;
            select.$select.parent().addClass("select_is-active");

            setTimeout(function () {
              $(document).on("click", function () {
                Select.close(select);
              });
            }, 0);
          }
        },
      },
    ]
  );

  return Select;
})();

function initSelect(select) {
  var selectList = [];

  $(select).each(function (selectIndex, selectNode) {
    selectList.push(new Select(selectNode, selectIndex));
    selectList[selectIndex].init();

    $(selectNode)
      .parent()
      .find(".select__selected")
      .off()
      .on("click", function () {
        Select.open(selectList[selectIndex]);
      });

    $(selectNode)
      .parent()
      .find(".select__options-item")
      .off()
      .on("click", function () {
        selectList[selectIndex].choose(
          $(this).index(),
          $(this).data("value"),
          $(this).text()
        );
        Select.close(selectList[selectIndex]);
      });
  });

  return selectList;
}
("use strict");

function initTv() {
  var tvSlider = $(".tv__slider");
  tvSlider.owlCarousel({
    items: 3,
    margin: 50,
    stagePadding: 50,
    responsive: {
      1024: {
        items: 3,
      },
      600: {
        items: 2,
      },
      400: {
        items: 1,
      },
      0: {
        items: 1,
      },
    },
  });

  $(".tv__nav-item_right").click(function () {
    tvSlider.trigger("next.owl.carousel");
  });

  $(".tv__nav-item_left").click(function () {
    tvSlider.trigger("prev.owl.carousel");
  });

  // $('.tv__slider-container_disabled').trigger('destroy.owl.carousel');

  $(".tv__channels-text").click(function () {
    $(".tip").removeClass("tip_is-active");
    $(this).parent().find(".tip").addClass("tip_is-active");
  });

  $(".tv__slider_disabled").trigger("destroy.owl.carousel");

  if (window.matchMedia("(max-width: 768px)").matches) {
    var sliderContainer = $(".tv__slider-container").owlCarousel({
      items: 3,
      margin: 20,
      responsive: {
        1024: {
          items: 3,
          stagePadding: 0,
        },
        600: {
          items: 2,
          stagePadding: 0,
        },
        400: {
          items: 1,
          stagePadding: 0,
        },
        0: {
          items: 1,
          stagePadding: 0,
        },
      },
    });
    $(".tv__nav-item_right").click(function () {
      $(".tv__slider-container").trigger("next.owl.carousel");
    });

    $(".tv__nav-item_left").click(function () {
      $(".tv__slider-container").trigger("prev.owl.carousel");
    });
  }
}
("use strict");

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var summaryHeight = $(".summary__container").outerHeight(true);

$(".summary_last .summary__dropdown")
  .off()
  .click(function () {
    $(".summary__description").stop().slideToggle(300);
  });

var Summary = (function () {
  function Summary(summary, trigger) {
    _classCallCheck(this, Summary);

    this.summary = $("." + summary);
    this.trigger = $(trigger);
    this.summaryName = summary;
    this.summaryFooterHeight = 0;
    this.summaryHeight = $(this.summary).outerHeight(true);
    this.triggerPosition = $(trigger).position();
    this.firstTariffPosition = $(".trigger02").eq(0).offset();
    this.height = $(window).height() - this.summaryHeight;
    this.summaryHead = $("." + summary + "__head").outerHeight();
    this.summaryContent = $("." + summary + "__content");
    this.totalHeight = $("." + summary + "__container").outerHeight();
    this.isOpened = true;
    this.isFixed = false;
    this.isHidden = true;
  }

  _createClass(Summary, [
    {
      key: "init",
      value: function init() {
        this.update();
        this.close(0);
        this.fix();
        this.isFixed = true;
      },
    },
    {
      key: "hide",
      value: function hide() {
        this.summary.addClass(this.summaryName + "_is-hidden");
        this.isHidden = true;
      },
    },
    {
      key: "show",
      value: function show() {
        this.summary.removeClass(this.summaryName + "_is-hidden");
        this.isHidden = false;
      },
    },
    {
      key: "open",
      value: function open() {
        var self = this;
        this.update();
        this.isOpened = true;
        this.summary.addClass(this.summaryName + "_is-active");
        TweenMax.to(
          this.summary,
          0.3,
          {
            height: this.totalHeight,
            ease: Power1.easeInOut,
          },
          0
        );
        TweenMax.to(
          this.summaryContent,
          0.3,
          {
            yPercent: 0,
            ease: Power1.easeInOut,
            onComplete: function onComplete() {
              self.update();
            },
          },
          0
        );
      },
    },
    {
      key: "close",
      value: function close(delay) {
        this.update();
        this.isOpened = false;
        this.summary.removeClass(this.summaryName + "_is-active");
        TweenMax.to(
          this.summary,
          delay,
          {
            height: this.summaryHead,
            ease: Power1.easeInOut,
          },
          0
        );

        TweenMax.to(
          this.summaryContent,
          delay,
          {
            yPercent: -100,
            ease: Power1.easeInOut,
          },
          0
        );
      },
    },
    {
      key: "fix",
      value: function fix() {
        $(this.summary).addClass("summary_fixed");
      },
    },
    {
      key: "unfix",
      value: function unfix() {
        $(this.summary).removeClass("summary_fixed");
      },
    },
    {
      key: "unfixTop",
      value: function unfixTop() {
        $(this.summary).removeClass("summary_fixed-top");
        $(this.summary).css("top", "");
      },
    },
    {
      key: "fixtop",
      value: function fixtop() {
        $(this.summary).addClass("summary_fixed-top");
        $(this.summary).css("top", this.firstTariffPosition.top);
      },
    },
    {
      key: "update",
      value: function update() {
        this.summaryHeight = $(this.summary).outerHeight(true);
        this.triggerPosition = $(this.trigger).position();
        this.height = $(window).height() - this.summaryHeight;
        this.summaryHead = $("." + this.summaryName + "__head").outerHeight();
        this.totalHeight = $(
          "." + this.summaryName + "__container"
        ).outerHeight();
        this.firstTariffPosition = $(".trigger02").eq(0).offset();
        this.summaryFooterHeight = $(this.summary)
          .find(".summary__description-wrap")
          .outerHeight(true);
      },
    },
    {
      key: "checkPositionMobile",
      value: function checkPositionMobile() {
        if (!this.isHidden) {
          this.update();
          if (
            $(document).scrollTop() >
            this.triggerPosition.top - this.height
          ) {
            this.open();
            this.unfix();
            this.isFixed = false;
          } else if (
            $(window).scrollTop() + $(window).height() <
            this.firstTariffPosition.top + this.summaryHead
          ) {
            this.fixtop();
            this.isFixed = true;
          } else if (
            $(document).scrollTop() <
            this.triggerPosition.top - ($(window).height() - this.summaryHead)
          ) {
            if (this.isFixed == false) {
              this.close(0);
            }
            this.fix();
            this.unfixTop();
            this.isFixed = true;
            if (
              $(".summary__dropdown").hasClass("summary__dropdown_is-active")
            ) {
              $(".summary__description").slideUp(function () {
                $(".summary__dropdown").removeClass(
                  "summary__dropdown_is-active"
                );
              });
            }
          }
        }
      },
    },
    {
      key: "checkPositionDesktop",
      value: function checkPositionDesktop() {
        if (!this.isHidden) {
          this.update();
          // unfix on bottom scroll
          if (
            $(document).scrollTop() + this.summaryFooterHeight >=
            this.triggerPosition.top - this.height
          ) {
            this.unfix();
          }
          //Fix top
          else if (
            $(window).scrollTop() + $(window).height() <
            this.firstTariffPosition.top + this.totalHeight
          ) {
            this.fixtop();
          }

          //Fix when scroll top
          else if (
            $(window).scrollTop() + $(window).height() >
            this.firstTariffPosition.top
          ) {
            this.fix();
            this.unfixTop();
            if (
              $(".summary__dropdown").hasClass("summary__dropdown_is-active")
            ) {
              $(".summary__description").slideUp(0, function () {
                $(".summary__dropdown").removeClass(
                  "summary__dropdown_is-active"
                );
              });
            }
          }
        }
      },
    },
  ]);

  return Summary;
})();
// if (checkMobile() == false) {
//     $(document).scroll(function () {
//       updatePosition();
//       height = $(window).height() - summaryHeight
//       if ($(document).scrollTop() >= summaryPosition.top - height) {
//         summary.removeClass('summary_fixed')
//       } else {
//         summary.addClass('summary_fixed')
//       }
//     })
//   }

if ($(".trigger01").length !== 0) {
  var summary = new Summary("summary", ".trigger01");
  summary.hide();
  if (checkMobile() == true) {
    $(document).scroll(function () {
      summary.checkPositionMobile();
    });

    $(".summary__head").click(function () {
      if (summary.isFixed == true) {
        if (summary.isOpened == false) {
          summary.open();
          // summary.isOpened = !summary.isOpened
        } else {
          summary.close(0.3);
        }
      }
    });
  } else {
    $(document).scroll(function () {
      summary.checkPositionDesktop();
    });
  }

  $(".summary__dropdown").click(function () {
    if (!$(this).hasClass("summary__dropdown_not-scroll")) {
      $(".summary__dropdown").toggleClass("summary__dropdown_is-active");
      if ($(".summary").hasClass("summary_fixed")) {
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $(".trigger01").position().top,
            },
            1000,
            function () {
              $(".summary__dropdown").addClass("summary__dropdown_is-active");
              if (
                !$(".summary__dropdown").hasClass("summary__dropdown_is-active")
              ) {
                $(".summary__description").slideUp({
                  duration: 300,
                  start: function start() {
                    if (checkMobile() == true) {
                      summary.open();
                    }
                  },
                  complete: function complete() {
                    if (checkMobile() == true) {
                      summary.open();
                    }
                  },
                });
              } else {
                $(".summary__description").slideDown({
                  duration: 300,
                  start: function start() {
                    if (checkMobile() == true) {
                      summary.open();
                    }
                  },
                  complete: function complete() {
                    if (checkMobile() == true) {
                      summary.open();
                    }
                  },
                });
              }
            }
          );
      } else {
        $(".summary__description")
          .stop()
          .slideToggle({
            duration: 300,
            start: function start() {
              if (checkMobile() == true) {
                summary.open();
              }
            },
            complete: function complete() {
              if (checkMobile() == true) {
                summary.open();
              }
            },
          });
      }
    }
  });
}
("use strict");

function initMenu() {
  //  Активация меню
  $(".navigation__item_burger").click(function () {
    $(".menu").toggleClass("menu_is-active");
  });

  // $(".menu__rollup .menu__item-text").click(function() {
  //   $(this).parent().toggleClass('menu__rollup_is-active');
  // })

  $(".menu__close").click(function () {
    $(".menu").removeClass("menu_is-active");
  });

  $(".menu__rollup .menu__item-text").each(toggleMenu);

  $(".menu__rollup .menu__item-text").click(toggleMenu);

  function toggleMenu() {
    var contentHeight = $(this).next().outerHeight(true);
    var titleHeight = $(this).outerHeight();
    var titleHeightTotal = $(this).outerHeight(true);
    var totalHeight = contentHeight + titleHeightTotal;

    // $(this).toggleClass('footer__nav-title_is-active')
    $(this).parent().toggleClass("menu__rollup_is-active");
    if ($(this).parent().hasClass("menu__rollup_is-active")) {
      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: totalHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    } else {
      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: titleHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    }
  }
}
("use strict");

function initVacansy() {
  $(".vacancy").each(function () {
    var totalHeight = $(this).find(".vacancy__content").outerHeight(true);
    var nameHeight = $(this).find(".vacancy__name").outerHeight(true);
    var firstArticleHeight = $(this)
      .find(".vacancy__article")
      .first()
      .outerHeight(true);
    var previewHeight = nameHeight + firstArticleHeight;
    var content = $(this).find(".vacancy__content-slider");

    if ($(this).hasClass("vacancy_is-active")) {
      TweenMax.to(
        content,
        0.3,
        {
          height: totalHeight,
          ease: Power1.easeInOut,
        },
        0
      );
      $(this).find(".vacancy__slide-text").text("Свернуть");
    } else {
      TweenMax.to(
        content,
        0.3,
        {
          height: previewHeight,
          ease: Power1.easeInOut,
        },
        0
      );
      $(this).find(".vacancy__slide-text").text("Развернуть");
    }
  });

  $(".vacancy__slide").click(function () {
    $(this).parents(".vacancy").toggleClass("vacancy_is-active");
    var totalHeight = $(this)
      .parents(".vacancy")
      .find(".vacancy__content")
      .outerHeight(true);
    var nameHeight = $(this)
      .parents(".vacancy")
      .find(".vacancy__name")
      .outerHeight(true);
    var firstArticleHeight = $(this)
      .parent(".vacancy")
      .find(".vacancy__article")
      .first()
      .outerHeight(true);
    var previewHeight = nameHeight + firstArticleHeight;
    var content = $(this).parents(".vacancy").find(".vacancy__content-slider");

    if ($(this).parents(".vacancy").hasClass("vacancy_is-active")) {
      TweenMax.to(
        content,
        0.3,
        {
          height: totalHeight,
          ease: Power1.easeInOut,
        },
        0
      );
      $(this).parents(".vacancy").find(".vacancy__slide-text").text("Свернуть");
    } else {
      TweenMax.to(
        content,
        0.3,
        {
          height: previewHeight,
          ease: Power1.easeInOut,
        },
        0
      );
      $(this)
        .parents(".vacancy")
        .find(".vacancy__slide-text")
        .text("Развернуть");
    }
  });
}
("use strict");

function initPayment() {
  $(".payment__panel").each(function () {
    var content = $(this).next();
    var contentHeight = $(content).outerHeight(true);
    var panelHeight = $(this).outerHeight(true);
    var itemHeight = panelHeight + contentHeight;

    if ($(this).hasClass("panel_is-active")) {
      TweenMax.to(
        content,
        0.3,
        {
          y: "0",
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0,
        {
          height: itemHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    } else {
      TweenMax.to(
        content,
        0.3,
        {
          y: "-" + contentHeight,
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0,
        {
          height: panelHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    }
  });

  $(".payment__panel").click(function () {
    $(this).toggleClass("panel_is-active");
    var content = $(this).next();
    var contentHeight = $(content).outerHeight(true);
    var panelHeight = $(this).outerHeight(true);
    var itemHeight = panelHeight + contentHeight;

    if ($(this).hasClass("panel_is-active")) {
      TweenMax.to(
        content,
        0.3,
        {
          y: "0",
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: itemHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    } else {
      TweenMax.to(
        content,
        0.3,
        {
          y: "-" + contentHeight,
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: panelHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    }
  });
}
("use strict");

function initQuestions() {
  $(".questions__item").each(function () {
    var content = $(this).find(".questions__answer");
    var contentHeight = $(content).outerHeight(true);
    var panelHeight = $(this).find(".questions__panel").outerHeight(true);
    var itemHeight = panelHeight + contentHeight;

    if ($(this).hasClass("questions__item_is-active")) {
      TweenMax.to(
        content,
        0.3,
        {
          y: "0",
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this),
        0.3,
        {
          height: itemHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    } else {
      TweenMax.to(
        content,
        0.3,
        {
          y: "-" + contentHeight,
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this),
        0.3,
        {
          height: panelHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    }
  });

  $(".questions__panel").click(function () {
    $(this).toggleClass("panel_is-active");
    $(this)
      .parents(".questions__item")
      .toggleClass("questions__item_is-active");
    var content = $(this).next();
    var contentHeight = $(content).outerHeight(true);
    var panelHeight = $(this).outerHeight(true);
    var itemHeight = panelHeight + contentHeight;

    if ($(this).hasClass("panel_is-active")) {
      TweenMax.to(
        content,
        0.3,
        {
          y: "0",
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: itemHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    } else {
      TweenMax.to(
        content,
        0.3,
        {
          y: "-" + contentHeight,
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: panelHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    }
  });
}
("use strict");

function initAdditional() {
  $(".additional__panel").click(function () {
    $(this).toggleClass("panel_is-active");
    var content = $(this).next();
    var contentHeight = $(content).outerHeight(true);
    var panelHeight = $(this).outerHeight(true);
    var itemHeight = panelHeight + contentHeight;

    if ($(this).hasClass("panel_is-active")) {
      TweenMax.to(
        content,
        0.3,
        {
          y: "0",
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: itemHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    } else {
      TweenMax.to(
        content,
        0.3,
        {
          y: "-" + contentHeight,
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: panelHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    }
  });
}
("use strict");

function initEquipmentDetailed() {
  $(".equipment-detailed__img_small").click(function () {
    var imagePath = $(this).find(".equipment-detailed__img-source").attr("src");
    $(".equipment-detailed__img_large .equipment-detailed__img-source").attr(
      "src",
      imagePath
    );
  });
}
("use strict");

function initFeedback() {
  $(".feedback__panel").click(function () {
    $(this).toggleClass("panel_is-active");
    // $(this).parents('.questions__item').toggleClass('questions__item_is-active');
    var content = $(this).next();
    var contentHeight = $(content).outerHeight(true);
    var panelHeight = $(this).outerHeight(true);
    var itemHeight = panelHeight + contentHeight;

    if ($(this).hasClass("panel_is-active")) {
      // TweenMax.to(content, 0.3, {
      //   y: `0`,
      //   ease: Power1.easeInOut
      // }, 0);

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: itemHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    } else {
      // TweenMax.to(content, 0.3, {
      //   y: `-${contentHeight}`,
      //   ease: Power1.easeInOut
      // }, 0);

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: panelHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    }
  });

  $(".feedback__subtitle").click(
    debounce(function () {
      $(this).toggleClass("feedback__subtitle_is-active");
      // $(this).parents('.questions__item').toggleClass('questions__item_is-active');
      var subContent = $(this).next();
      var mainContent = $(this).parents(".feedback__item");
      var mainContentHeight = mainContent
        .find(".feedback__item-content")
        .outerHeight(true);
      var subContentHeight = $(subContent).outerHeight(true);
      var subPanelHeight = $(this).outerHeight(true);
      var subItemHeight = subPanelHeight + subContentHeight;
      var totalHeight = mainContentHeight + subItemHeight;
      var mainHeight = mainContentHeight - subContentHeight + subPanelHeight;

      if ($(this).hasClass("feedback__subtitle_is-active")) {
        TweenMax.to(
          $(this).parent(),
          0.3,
          {
            height: subItemHeight,
            ease: Power1.easeInOut,
          },
          0
        );

        TweenMax.to(
          mainContent,
          0.3,
          {
            height: totalHeight + 7,
            ease: Power1.easeInOut,
          },
          0
        );
      } else {
        // TweenMax.to(content, 0.3, {
        //   y: `-${contentHeight}`,
        //   ease: Power1.easeInOut
        // }, 0);

        TweenMax.to(
          $(this).parent(),
          0.3,
          {
            height: subPanelHeight,
            ease: Power1.easeInOut,
          },
          0
        );
        TweenMax.to(
          mainContent,
          0.3,
          {
            height: mainHeight,
            ease: Power1.easeInOut,
          },
          0
        );
      }
    }, 300)
  );
}
("use strict");

function initForm() {
  $(".form__select-label").click(function () {
    $(this).addClass("form__select-label_is-hidden");
    $(this).prev().addClass("select_is-active");
  });

  $(".form__input").on("focus", function () {
    $(this).siblings(".form__input-error").css({ display: "none" });
  });
  $(".form__button-send").on("click", function () {
    $(".form__input").each(function () {
      if ($(this).val() == "") {
        $(this).siblings(".form__input-error").css({ display: "flex" });
      }
    });

    var phoneVal = $(".input_phone").val();

    if (phoneVal.search("_") > 0) {
      $(".input_phone").siblings(".form__input-error").css({ display: "flex" });
    }
  });
}

("use strict");
function initSwitch() {
  $(".switch__item").css("display", "none");
  $(".switch__item")
    .first()
    .css("display", "flex")
    .addClass("switch__item_is-active");
  $(".switch__button").click(function () {
    $(".switch__button").removeClass("switch__button_is-active");
    $(this).addClass("switch__button_is-active");
    var data = $(this).data();
    $(".switch__item").each(function () {
      var _this = this;

      if ($(this).data("switch") == data.switch) {
        $(".switch__item").removeClass("switch__item_is-active");
        setTimeout(function () {
          $(".switch__item").css("display", "none");
        }, 200);

        setTimeout(function () {
          $(_this).css("display", "flex");
        }, 200);

        setTimeout(function () {
          $(_this).addClass("switch__item_is-active");
        }, 210);
        $(this).removeClass("switch__item_is-hidden");
      }
    });
  });
}
("use strict");

function initFooter() {
  window.addEventListener(
    "resize",
    debounce(function () {
      toggleFooter();
    }, 200)
  );

  function toggleFooter() {
    if (checkMobile() == true) {
      $(".footer__nav-title").each(function () {
        var contentHeight = $(this).next().outerHeight();
        var titleHeight = $(this).outerHeight();
        var titleHeightTotal = $(this).outerHeight(true);
        var totalHeight = contentHeight + titleHeightTotal;
        TweenMax.to(
          $(this).parent(),
          0.3,
          {
            height: titleHeight,
            ease: Power1.easeInOut,
          },
          0
        );
      });

      $(".footer__nav-title")
        .off("click")
        .on("click", function () {
          var contentHeight = $(this).next().outerHeight();
          var titleHeight = $(this).outerHeight();
          var titleHeightTotal = $(this).outerHeight(true);
          var totalHeight = contentHeight + titleHeightTotal;

          $(this).toggleClass("footer__nav-title_is-active");
          if (!$(this).hasClass("footer__nav-title_is-active")) {
            TweenMax.to(
              $(this).parent(),
              0.3,
              {
                height: totalHeight,
                ease: Power1.easeInOut,
              },
              0
            );
          } else {
            TweenMax.to(
              $(this).parent(),
              0.3,
              {
                height: titleHeight,
                ease: Power1.easeInOut,
              },
              0
            );
          }
        });
    } else {
      $(".footer__nav-list").each(function () {
        $(this).css("height", "");
      });
    }
  }
  toggleFooter();
}
("use strict");

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

//begin

var Calculator = (function () {
  function Calculator() {
    _classCallCheck(this, Calculator);

    this.names = [];
    this.leaseTotal = $(".total-lease");
    this.equipTotal = $(".total-equip");
    this.total = $(".total");
    this.selected = $(".summary__name");
    this.equipTotalNumber = parseInt(this.leaseTotal.html());
    this.leaseTotalNumber = parseInt(this.equipTotal.html());
    this.totalNumber = parseInt(this.total.html());
    // this.selectTariff = this.selectTariff.apply(this);
  }

  _createClass(Calculator, [
    {
      key: "unselectTariff",
      value: function unselectTariff(context) {
        $(".tariffs__item").removeClass("is-active");
        $(".tariffs__head").removeClass("is-active");
        $(".tariffs__select").removeClass("tariffs__select_is-active");
        context
          .find(".tariffs__select")
          .removeClass("tariffs__select_is-active");
        context.parents(".tariffs__item").removeClass("is-active");
      },
    },
    {
      key: "selectTariff",
      value: function selectTariff(context) {
        $(".tariffs__item").removeClass("is-active");
        $(".tariffs__select").removeClass("tariffs__select_is-active");
        context.parents(".tariffs__item").addClass("is-active");
        context.find(".tariffs__select").addClass("tariffs__select_is-active");
      },
    },
    {
      key: "checkTariff",
      value: function checkTariff(context) {
        var tariffActives = $(".tariffs__item.calc").find(".is-active");
        var parentItem = $(context).parents(".tariffs__item.calc");
        if (context !== undefined) {
          $(".tariffs__item.calc.is-active")
            .not(parentItem)
            .find(".tariffs__select")
            .removeClass("tariffs__select_is-active");
          $(".tariffs__item.calc.is-active")
            .not(parentItem)
            .removeClass("is-active")
            .find(".tariffs__head")
            .removeClass("is-active");
        }
        if (tariffActives.length == 0) {
          $(context)
            .parents(".tariffs__item")
            .find(".tariffs__select")
            .removeClass("tariffs__select_is-active");
        } else {
          $(context)
            .parents(".tariffs__item")
            .addClass("is-active")
            .find(".tariffs__select")
            .addClass("tariffs__select_is-active");
          $(context)
            .parents(".tariffs__item")
            .find(".tariffs__head")
            .addClass("is-active");
        }

        var actives = $(".calc.is-active");
        if (actives.length == 0) {
          summary.hide();
        } else {
          summary.show();
          checkMobile()
            ? summary.checkPositionMobile()
            : summary.checkPositionDesktop();
          this.calculate(context);
        }
      },
    },
    {
      key: "checkExtra",
      value: function checkExtra() {
        var actives = $(".extra__item_ntv.calc").find(".is-active");
        if (actives.length == 0) {
          $(".extra__item_ntv.calc").removeClass("is-active");
        }
        this.checkTariff();
      },
    },
    {
      key: "checkExtraPhones",
      value: function checkExtraPhones() {
        var actives = $(".extra__item_telephone.calc").find(".is-active");
        if (actives.length == 0) {
          $(".extra__item_telephone.calc").removeClass("is-active");
        }
        this.checkTariff();
      },
    },
    {
      key: "init",
      value: function init() {
        var self = this;
        $(".tariffs__head")
          .unbind("click")
          .click(function () {
            var head = $(this);
            // $(this).parents('.tariffs__item').addClass('is-active');
            $(this).addClass("is-active");
            var headSelect = head.find(".tariffs__select");
            if (headSelect.hasClass("tariffs__select_is-active")) {
              self.unselectTariff($(this));
              self.calculate($(this));
              self.checkTariff();
            } else {
              self.selectTariff($(this));
              self.calculate($(this));
              self.checkTariff();
            }
          });
      },
    },
    {
      key: "calculate",
      value: function calculate() {
        var self = this;
        self.equipTotalNumber = 0;
        self.leaseTotalNumber = 0;
        self.totalNumber = 0;
        self.names = [];
        self.leaseTotal.html(self.leaseTotalNumber);
        self.equipTotal.html(self.equipTotalNumber);
        self.total.html(self.totalNumber);
        var activeTariffs = $(".calc.is-active");
        activeTariffs.each(function () {
          $(this)
            .find(".is-active")
            .each(function () {
              var elem = $(this);
              var price = parseInt(elem.find(".price").html());
              if (price !== price) price = 0;
              var name = elem.find(".info__name").html();
              var type = elem.find(".info__type").html();
              var payType = elem.find(".info__paytype").html();
              if (payType == undefined) {
                payType = "";
              }
              if ($(elem).hasClass("equip")) {
                if ($(elem).hasClass("rent")) {
                  self.leaseTotalNumber += price;
                  self.leaseTotal.html(self.leaseTotalNumber);
                  self.names.push(" " + type + ": " + payType + " " + name);
                  // self.selected.html(self.names)
                } else {
                  self.equipTotalNumber += price;
                  self.equipTotal.html(self.equipTotalNumber);
                  self.names.push(" " + type + ": " + payType + " " + name);
                  // self.selected.html(self.names)
                }
              } else {
                self.leaseTotalNumber += price;
                self.leaseTotal.html(self.leaseTotalNumber);
                self.names.push(" " + type + ": " + payType + " " + name);
                // self.selected.html(self.names)
              }
            });
        });
        self.totalNumber += self.leaseTotalNumber + self.equipTotalNumber;
        self.total.html(self.totalNumber);
        var formatNames = self.names.toString();
        self.selected.html(formatNames);
      },
    },
  ]);

  return Calculator;
})();
("use strict");

function initNavigation() {
  var listHeight = $(".navigation__sublist").outerHeight(true);

  $(".navigation__item_help .navigation__item-title").click(function () {
    $(this).parent().toggleClass("navigation__item_is-active");
    if (!$(this).parent().hasClass("navigation__item_is-active")) {
      TweenMax.to(
        $(this).next(),
        0.2,
        {
          height: 0,
          ease: Power1.easeInOut,
        },
        0
      );
    } else {
      TweenMax.to(
        $(this).next(),
        0.2,
        {
          height: listHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    }
  });
}
("use strict");

function initInstructions() {
  $(".instructions__panel").click(function () {
    $(this).toggleClass("panel_is-active");
    // $(this).parents('.questions__item').toggleClass('questions__item_is-active');
    var content = $(this).next();
    var contentHeight = $(content).outerHeight(true);
    var panelHeight = $(this).outerHeight(true);
    var itemHeight = panelHeight + contentHeight;

    if ($(this).hasClass("panel_is-active")) {
      TweenMax.to(
        content,
        0.3,
        {
          y: "0",
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: itemHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    } else {
      TweenMax.to(
        content,
        0.3,
        {
          y: "-" + contentHeight,
          ease: Power1.easeInOut,
        },
        0
      );

      TweenMax.to(
        $(this).parent(),
        0.3,
        {
          height: panelHeight,
          ease: Power1.easeInOut,
        },
        0
      );
    }
  });
}

///////////// logo /////////////
function initHeader() {
  $(".animate_logo").click(function (event) {
    event.preventDefault();
    var $this = $(this);
    $this.addClass("header__logo_animate");
    setTimeout(function () {
      $this.removeClass("header__logo_animate");
    }, 300);
  });
}

var n_stock = parseInt($(".stock_block .count_click").html());
$(".animate_logo").click(function (event) {
  event.preventDefault();
  var element = event.currentTarget;
  element.clicks = (element.clicks || 0) + 1;
  if (element.clicks == n_stock) {
    element.clicks = 0;

    $.ajax({
      url: "/get_ajax_connect.php",
      type: "POST",
      data: {
        ID: $(".stock_block .stock_id").html(),
        TYPE: "stock",
        ACTION: "show",
      },
      success: function (data) {
        $(".stock_block").html(data);
        initPopups();
        $(".popup_bonus").addClass("popup_is-active");
      },
    });
  }
});

///////////// map /////////////
function smoothZoom(map, max, cnt) {
  var x;
  if (cnt > max) {
    x = true;
  } else if (cnt < max) {
    x = false;
  } else {
    setTimeout(function () {
      map.setZoom(cnt);
    }, 100);
    return;
  }

  var z = google.maps.event.addListener(map, "zoom_changed", function (event) {
    google.maps.event.removeListener(z);
    smoothZoom(map, max, x ? cnt - 1 : cnt + 1);
  });
  setTimeout(function () {
    map.setZoom(cnt);
  }, 100);
}

var map;
function initMap() {
  if (document.querySelector("#map") !== null) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 55.751244, lng: 37.618423 },
      zoom: 10,
      disableDefaultUI: true,
    });

    var arCords = [];

    $(".cord").each(function () {
      arCords = $(this).html().split(",");

      var marker = new google.maps.Marker({
        position: { lat: Number(arCords[0]), lng: Number(arCords[1]) },
        map: map,
        icon: {
          url: window.location.href + "/pin/pin.svg",
          scaledSize: new google.maps.Size(45, 45),
        },
      });

      marker.setMap(map);
    });

    $(".contacts-map__select").click(function () {
      if ($(this).hasClass("contacts-map__select_is-active")) {
        $(".contacts-map__select").removeClass(
          "contacts-map__select_is-active"
        );
        $(".contacts-map__select")
          .find(".contacts-map__select-text")
          .slideUp(200);
        $(this).removeClass("contacts-map__select_is-active");
        $(this).find(".contacts-map__select-text").slideUp(200);
      } else {
        $(".contacts-map__select").removeClass(
          "contacts-map__select_is-active"
        );
        $(".contacts-map__select")
          .find(".contacts-map__select-text")
          .slideUp(200);
        $(this).addClass("contacts-map__select_is-active");
        $(this).find(".contacts-map__select-text").slideDown(200);

        var centr = map.getCenter();
        var arCords = $(this).find(".cord").html().split(",");

        if (centr.lat() != arCords[0] && centr.lng() != arCords[1]) {
          var zoom = (map.getZoom() - 10) * 100;
          zoom = zoom == 0 ? 0 : zoom + 200;

          smoothZoom(map, 10, map.getZoom());

          window.setTimeout(function () {
            var f = google.maps.event.addListenerOnce(map, "idle", function () {
              map.panTo({ lat: Number(arCords[0]), lng: Number(arCords[1]) });
              google.maps.event.removeListener(f);

              window.setTimeout(function () {
                smoothZoom(map, 15, map.getZoom());
              }, zoom + 300);
            });
          }, zoom);
        }
      }
    });
  }
}

if (checkMobile()) {
  $(".contacts-map__wrap_map").insertAfter($(".contacts-map__select_central"));
}

function initMapYa() {
  if (document.querySelector("#map") !== null) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map("map", {
        center: [55.751244, 37.618423],
        zoom: 10,
        controls: ["zoomControl"],
      });

      myMap.options.set("maxAnimationZoomDifference", Infinity);
      myMap.behaviors.disable("scrollZoom");

      var arCords = [];

      $(".cord").each(function () {
        arCords = $(this).html().split(",");

        var marker = new ymaps.Placemark(
          [Number(arCords[0]), Number(arCords[1])],
          {
            hintContent: "",
            balloonContent: "",
          },
          {
            iconLayout: "default#image",
            iconImageHref: "pin/pin.svg",
            iconImageSize: [45, 45],
          }
        );

        myMap.geoObjects.add(marker);
      });

      $(".contacts-map__select").click(function () {
        if ($(this).hasClass("contacts-map__select_is-active")) {
          $(".contacts-map__select").removeClass(
            "contacts-map__select_is-active"
          );
          $(".contacts-map__select")
            .find(".contacts-map__select-text")
            .slideUp(200);
          $(this).removeClass("contacts-map__select_is-active");
          $(this).find(".contacts-map__select-text").slideUp(200);
        } else {
          $(".contacts-map__select").removeClass(
            "contacts-map__select_is-active"
          );
          $(".contacts-map__select")
            .find(".contacts-map__select-text")
            .slideUp(200);
          $(this).addClass("contacts-map__select_is-active");
          $(this).find(".contacts-map__select-text").slideDown(200);

          var centr = myMap.getCenter();
          var arCords = $(this).find(".cord").html().split(",");

          if (centr[0] != arCords[0] && centr[1] != arCords[1]) {
            var zoom = (myMap.getZoom() - 10) * 100;
            zoom = zoom == 0 ? 0 : zoom + 200;

            myMap
              .setZoom(10, {
                smooth: true,
                duration: zoom,
              })
              .then(function () {
                myMap
                  .panTo([Number(arCords[0]), Number(arCords[1])])
                  .then(function () {
                    myMap.setZoom(14, {
                      smooth: true,
                      duration: zoom + 300,
                    });
                  });
              });
          }
        }
      });
      $($(".contacts-map__select").get(0)).trigger("click");
    });
  }
}

("use strict");

///////////// Сркыть секции в начале /////////////
$(".filter__item#01")
  .addClass("filter__item_is-active")
  .find("input")
  .prop("checked", true);
$(".filter__item#02")
  .addClass("filter__item_is-active")
  .find("input")
  .prop("checked", true);

$(".filter__item#01").click(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).removeClass("filter__item_is-active");
    $(this).find("input").prop("checked", false);
    $(".filter__item#02")
      .removeClass("filter__item_is-active")
      .find("input")
      .prop("checked", false);
    $(".tariffs__container").css("max-width", "970px");
    $(".extra__container").css("max-width", "970px");
    //---------------------
    $(".section_internet").css("display", "none");
    $(".section_internet_tv").css("display", "none");
    //--
    $(".tariffs").slideUp(400, function () {
      reinitBonusTariffs(4);
      reinitExtraSlider(4);
      updateSliders();
      updateTariffs();
    });
  } else {
    $(this).addClass("filter__item_is-active");
    $(this).find("input").prop("checked", true);
    //---------------------
    $(".section_internet").css("display", "block");
    $(".section_internet_tv").css("display", "none");
    //---------------------
    $(".tariffs").slideDown(400, function () {
      reinitBonusTariffs(4);
      updateSliders();
      updateTariffs();
    });
  }
});

$(".filter__item#02").click(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).removeClass("filter__item_is-active");
    $(this).find("input").prop("checked", false);
    $(".tariffs__container").css("max-width", "970px");
    $(".extra__container").css("max-width", "970px");
    //---------------------
    $(".section_internet").css("display", "block");
    $(".section_internet_tv").css("display", "none");
    //---------------------
    updateSliders();
    reinitBonusTariffs(4);
    reinitExtraSlider(4);
    updateTariffs();
  } else {
    $(".filter__item#01")
      .addClass("filter__item_is-active")
      .find("input")
      .prop("checked", true);
    $(this).addClass("filter__item_is-active");
    $(this).find("input").prop("checked", true);
    $(".tariffs__container").css("max-width", "1200px");
    $(".extra__container").css("max-width", "1200px");
    //---------------------
    $(".section_internet").css("display", "none");
    $(".section_internet_tv").css("display", "block");
    //---------------------
    $(".tariffs").slideDown(400);
    updateSliders();
    reinitBonusTariffs(5);
    reinitExtraSlider(5);
    updateTariffs();
  }
});

$(".filter__item#03").click(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).removeClass("filter__item_is-active");
    $(this).find("input").prop("checked", false);
    $(".extra__item_ntv").css("display", "none");
    updateSliders();
  } else {
    $(this).addClass("filter__item_is-active");
    $(this).find("input").prop("checked", true);
    $(".extra__item_ntv").css("display", "block");
    updateSliders();
    if (checkMobile() == true) {
      setExtraHeight();
    }
  }
});

$(".filter__item#04").click(function () {
  if ($(this).find("input").is(":checked")) {
    $(this).removeClass("filter__item_is-active");
    $(this).find("input").prop("checked", false);
    $(".extra__item_telephone").slideUp(400);
    updateSliders();
  } else {
    $(this).addClass("filter__item_is-active");
    $(this).find("input").prop("checked", true);
    $(".extra__item_telephone").slideDown(400);
    updateSliders();
  }
});

///////////// Переключение городов /////////////
$(".extra__list-item").on("click", function () {
  if ($(this).find("input").is(":checked")) {
    $(this).find("input").prop("checked", false);
    $(this).removeClass("extra__list-item_is-active");
  } else {
    $(this).find("input").prop("checked", true);
    $(".extra__list-item").removeClass("extra__list-item_is-active");
    $(this).addClass("extra__list-item_is-active");
  }

  if ($(".extra__input #m").is(":checked")) {
    $(".msk").css("display", "block");
    $(".other").css("display", "none");
  } else if ($(".extra__input #o").is(":checked")) {
    $(".msk").css("display", "none");
    $(".other").css("display", "block");
  } else {
    $(".msk").css("display", "none");
    $(".other").css("display", "none");
  }

  if (
    $(".sections__item.summary.summary_fixed").length &&
    strSelect.length == 0
  ) {
    summary.hide();
  } else if (
    $(".sections__item.summary.summary_fixed").length &&
    $(".summary_fixed section").hasClass("summary_is-hidden")
  ) {
    summary.show();
    if (checkMobile() == true) {
      summary.init();
    }
  }
});

///////////// ajax /////////////
var stopInputAjax = false;
$(".filter__input_address input").focus(function () {
  stopInputAjax = false;
});

$(".filter__input_address").keyup(function () {
  var self = $(this);
  if (self.find("input").val().length == 0) {
    self
      .parents(".filter__wrapper")
      .find(".input__dropdown_street")
      .removeClass("input__dropdown_is-active");
  } else {
    $.ajax({
      url: "/get_ajax_connect.php",
      type: "POST",
      data: {
        KEY_WORDS1: $(".filter__input_address input").val(),
        TYPE: "get-st",
      },
      success: function (responseJSON) {
        console.log(stopInputAjax);
        if (stopInputAjax == true) return;
        if (responseJSON && responseJSON.length > 7) {
          self
            .parents(".filter__wrapper")
            .find(".input__dropdown_street")
            .addClass("input__dropdown_is-active");
          $(".input__dropdown_street").html(responseJSON);
        } else {
          self
            .parents(".filter__wrapper")
            .find(".input__dropdown_street")
            .removeClass("input__dropdown_is-active");
        }
      },
      error: function (data) {
        self
          .parents(".filter__wrapper")
          .find(".input__dropdown_street")
          .removeClass("input__dropdown_is-active");
      },
    });
  }
});
$(".filter__input_address input").blur(function () {
  $(this)
    .parents(".filter__wrapper")
    .find(".input__dropdown_house")
    .removeClass("input__dropdown_is-active");
});

$(".filter__input_home").keyup(function () {
  var self = $(this);
  if (self.find("input").val().length == 0) {
    self
      .parents(".filter__wrapper")
      .find(".input__dropdown_house")
      .removeClass("input__dropdown_is-active");
  } else {
    $.ajax({
      url: "/get_ajax_connect.php",
      type: "POST",
      data: {
        KEY_WORDS1: $(".filter__input_address input").val(),
        KEY_WORDS2: $(".filter__input_home input").val(),
        TYPE: "get-hm",
      },
      success: function (responseJSON) {
        if (responseJSON && responseJSON.length) {
          self
            .parents(".filter__wrapper")
            .find(".input__dropdown_house")
            .addClass("input__dropdown_is-active");
          $(".input__dropdown_house").html(responseJSON);
        } else {
          self
            .parents(".filter__wrapper")
            .find(".input__dropdown_house")
            .removeClass("input__dropdown_is-active");
        }
      },
      error: function (data) {
        self
          .parents(".filter__wrapper")
          .find(".input__dropdown_house")
          .removeClass("input__dropdown_is-active");
      },
    });
  }
});
$(".filter__input_home input").blur(function () {
  $(this)
    .parents(".filter__wrapper")
    .find(".input__dropdown_house")
    .removeClass("input__dropdown_is-active");
});

$(document).mouseup(function (event) {
  if (
    $(event.target).closest(".filter__tooltip").length ||
    $(event.target).closest(".filter__button").length
  )
    return;
  $(".filter__tooltip").removeClass("filter__tooltip_is-active");
  event.stopPropagation();
  check_connect = true;
});

var check_connect = true;
$(".filter__button").click(function (event) {
  event.preventDefault();
  if (check_connect) {
    check_connect = false;
    $.ajax({
      url: "/get_ajax_connect.php",
      type: "POST",
      data: {
        KEY_WORDS1: $(".filter__input_address input").val(),
        KEY_WORDS2: $(".filter__input_home input").val(),
        TYPE: "check",
      },
      dataType: "json",
      success: function (responseJSON) {
        if (!responseJSON.text) return;
        $(".filter__tooltip").html(responseJSON.text);
        $(".filter__tooltip").addClass("filter__tooltip_is-active");
      },
      error: function (data) {
        $(".filter__tooltip").removeClass("filter__tooltip_is-active");
      },
    });
  }
});

$("body").on(
  "click",
  ".input__dropdown_street .input__dropdown-item",
  function () {
    $(".filter__input_address input").val($(this).html());
  }
);

$("body").on(
  "click",
  ".input__dropdown_house .input__dropdown-item",
  function () {
    $(".filter__input_home input").val($(this).html());
  }
);

///////////// forms /////////////

function setAdress() {
  if (
    $(".filter__input_address input").length > 0 &&
    $(".popup .street").length > 0
  )
    $(".popup .street").val($(".filter__input_address input").val());

  if ($(".filter__input_home input").length > 0 && $(".popup .home").length > 0)
    $(".popup .home").val($(".filter__input_home input").val());
}

$(".summary__button").on("click", function () {
  setAdress();
  $(".selected_hidden_ultra_power").val(
    $(".summary__head .summary__name").html()
  );
  $(".monthly_pay").val($(".total-lease").html());
  $(".equipment_pay").val($(".total-equip").html());
  $(".final_pay").val($(".total").html());
});

$(".connect__button.button.button_theme_full-orange").on("click", function () {
  setAdress();
  $(".new_abonent").addClass("popup_is-active");
  $("body").addClass("body_no-scroll");
});

$(".service__button.button.button_theme_full-orange").on("click", function () {
  setAdress();
  $(".new_abonent").addClass("popup_is-active");
  $("body").addClass("body_no-scroll");
});

$(".header__button.button.button_size_regular.button_theme_full-orange")
  .off()
  .on("click", function () {
    setAdress();
    $(".popup.popup_feedback").addClass("popup_is-active");
    $(".popup").addClass("popup_is-active");
    $("body").addClass("body_no-scroll");
  });

$(".connect__button.button.button_theme_full-green").on("click", function () {
  setAdress();
  $(".old_abonent").addClass("popup_is-active");
  $("body").addClass("body_no-scroll");
});

$(".contacts-cards__button.dir_letter").on("click", function () {
  setAdress();
  $(".letter_direct").addClass("popup_is-active");
  $("body").addClass("body_no-scroll");
});

$(".equipment-catalog__button").on("click", function () {
  setAdress();
  $(".equipment_buy").addClass("popup_is-active");
  $("body").addClass("body_no-scroll");
  var self = $(this).parents(".equipment-catalog__item");

  $("#name_equipment_cool").val(self.find(".equipment-catalog__name").html());
});

$(".equipment-detailed__button").on("click", function () {
  setAdress();
  $(".equipment_buy").addClass("popup_is-active");
  $("body").addClass("body_no-scroll");
  var self = $(this).parents(".equipment-detailed__container.container");

  $("#name_equipment_cool").val(
    self.find(".equipment-detailed__title.title.title_theme_green").html()
  );
});

$(".advantages__button").on("click", function () {
  setAdress();
  $(".new_abonent").addClass("popup_is-active");
  $("body").addClass("body_no-scroll");
});

var strSelectAdditional = [];
var mPay = 0,
  ePay = 0;

$(".option-card").click(function () {
  if ($(this).find(".input__source").is(":checked")) {
    $(this).find(".input__source").prop("checked", false);
    $(this).removeClass("option-card_is-active");

    var n = strSelectAdditional.indexOf(
      $(this).find(".option-card__title").html()
    );
    var m = parseInt($(this).find(".additional_rent").html());
    var e = parseInt($(this).find(".additional_buy").html());

    strSelectAdditional.splice(n, 1);
    $(".summary__name").html(strSelectAdditional);

    mPay -= isNaN(m) ? 0 : m;
    $(".total-lease").html(mPay);

    ePay -= isNaN(e) ? 0 : e;
    $(".total-equip").html(ePay);

    $(".total").html(mPay + ePay);
  } else {
    $(this).find(".input__source").prop("checked", true);
    $(this).addClass("option-card_is-active");

    var m = parseInt($(this).find(".additional_rent").html());
    var e = parseInt($(this).find(".additional_buy").html());

    strSelectAdditional.push($(this).find(".option-card__title").html());
    $(".summary__name").html(strSelectAdditional);

    mPay += isNaN(m) ? 0 : m;
    $(".total-lease").html(mPay);

    ePay += isNaN(e) ? 0 : e;
    $(".total-equip").html(ePay);

    $(".total").html(mPay + ePay);
  }

  if (strSelectAdditional.length > 0) {
    summary.show();
  } else {
    summary.hide();
  }
});

$(document).ready(function () {
  $(".contacts-map__select_central").trigger("click");

  $(".form__file-upload input").change(function () {
    var _self = $(this);
    setTimeout(function () {
      var filename = _self
        .val()
        .split(/(\\|\/)/g)
        .pop();
      if (_self[0].files.length > 0) {
        if (_self[0].files[0].size > 10485760) {
          $(".form__file-upload .input__label").html("Прикрепить файл");
          _self.val("");
          return false;
        }
      }

      if (filename != "") {
        $(".form__file-upload .input__label").html(filename);
      } else {
        $(".form__file-upload .input__label").html("Прикрепить файл");
      }
    }, 500);
  });
});

$(".filter__button")
  .unbind("click")
  .click(function (event) {
    event.preventDefault();
    if (check_connect) {
      check_connect = false;
      $.ajax({
        url: "/get_ajax_connect.php",
        type: "POST",
        data: {
          KEY_WORDS1: $(".filter__input_address input").val(),
          KEY_WORDS2: $(".filter__input_home input").val(),
          TYPE: "check",
        },
        dataType: "json",
        success: function (responseJSON) {
          if (!responseJSON.text) return;
          $(".filter__tooltip").html(responseJSON.text);
          $(".filter__tooltip").addClass("filter__tooltip_is-active");
          if (!responseJSON.tariffs) responseJSON.tariffs = "";
          refreshTariffBlock(responseJSON.tariffs);
        },
        error: function (data) {
          $(".filter__tooltip").removeClass("filter__tooltip_is-active");
          refreshTariffBlock(false);
        },
      });
    }
  });

window.defaultTariffs = $(
  ".tariffs__container .section_internet_tv .tariffs__item:visible, .tariffs__container .section_internet .tariffs__item:visible"
);
function refreshTariffBlock(ids) {
  if (!ids) ids = [];
  $(
    ".tariffs__container .section_internet_tv .tariffs__item, .tariffs__container .section_internet .tariffs__item"
  ).hide();
  if (ids.length) {
    for (var i in ids)
      $(
        ".tariffs__container .section_internet_tv .tariffs__item[data-id=" +
          ids[i] +
          "], .tariffs__container .section_internet .tariffs__item[data-id=" +
          ids[i] +
          "]"
      ).show();
  } else window.defaultTariffs.show();
  // $.ajax({
  // url: '/get_ajax_connect.php',
  // type: "POST",
  // data: {
  // KEY_WORDS1: $('.filter__input_address input').val(),
  // KEY_WORDS2: $('.filter__input_home input').val(),
  // TYPE: 'refreshTariffBlock',
  // ID: ids
  // },
  // dataType:'json',
  // success: function(responseJSON){
  // var preloader = new Preloader();
  // preloader.on();
  // if(!responseJSON.internetHTML) responseJSON.internetHTML = '';
  // if(!responseJSON.internetTVHTML) responseJSON.internetTVHTML = '';
  // $('.tariffs__container .section_internet_tv').empty().append(responseJSON.internetTVHTML);
  // $('.tariffs__container .section_internet').empty().append(responseJSON.internetHTML);
  // preloader.off();
  // calc.init();
  // updateSliders();
  // updateTariffs();
  // initTariffSliders();
  // initExtraSlider();
  // initInternetTariffs();
  // }
  // });
}

$(".tariffs__dropdown").unbind("click");

$(".tariffs__container").on("click", ".tariffs__dropdown", function (event) {
  if ($(this).parents(".tariffs__item").hasClass("tariffs__item_is-active")) {
    $(this).parents(".tariffs__item").removeClass("tariffs__item_is-active");

    TweenMax.to(
      $(this).parents(".tariffs__item").find(".tariffs__content"),
      0.4,
      {
        height: 0,
        ease: Power1.easeInOut,
      },
      0
    );
  } else {
    var tariffsContentHeight = $(this)
      .parents(".tariffs__item")
      .find(".tariffs__content-wrap")
      .outerHeight(true);
    $(".tariffs__item").removeClass("tariffs__item_is-active");
    $(this).parents(".tariffs__item").addClass("tariffs__item_is-active");

    TweenMax.to(
      $(".tariffs__item").find(".tariffs__content"),
      0.4,
      {
        height: 0,
        ease: Power1.easeInOut,
      },
      0
    );

    TweenMax.to(
      $(this).parents(".tariffs__item").find(".tariffs__content"),
      0.4,
      {
        height: tariffsContentHeight,
        ease: Power1.easeInOut,
      },
      0
    );

    var $this = $(this);

    setTimeout(function () {
      $("html, body").animate(
        {
          scrollTop: $this.parents(".tariffs__item").offset().top,
        },
        400,
        "easeInOutQuart"
      );
    }, 450);
  }
});

$(".package").unbind("click");

$(".tariffs__container").on("click", ".package", function () {
  if ($(this).find("input").is(":checked")) {
    $(this).find("input").prop("checked", false);
    $(this).removeClass("package_is-active is-active");
    calc.calculate();
    calc.checkTariff($(this));
  } else {
    $(this).find("input").prop("checked", true);
    // $('.tariffs__list-item').removeClass('package_is-active is-active');
    $(this).addClass("package_is-active is-active");
    calc.calculate();
    calc.checkTariff($(this));
  }
});

$(".tariffs__channels-close").unbind("click");

$(".tariffs__container").on("click", ".tariffs__channels-close", function () {
  if (
    $(this)
      .parents(".tariffs__channels")
      .hasClass("tariffs__channels_is-active")
  ) {
    $(".tariffs__channels").removeClass("tariffs__channels_is-active");
    $("body").removeClass("body_no-scroll");
  }
});

$(".equip-tv .tariffs__equipment-wrap").unbind("click");

$(".tariffs__container").on(
  "click",
  ".equip-tv .tariffs__equipment-wrap",
  function () {
    if ($(this).find("input").is(":checked")) {
      $(this).find("input").prop("checked", false).change();
      $(this).removeClass("is-active");
      calc.calculate($(this));
      calc.checkTariff($(this));
    } else {
      $(this)
        .parents(".tariffs__additional")
        .find(".equip-tv .tariffs__equipment-wrap")
        .each(function () {
          if ($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            $(this).find("input").prop("checked", false).change();
          }
        });

      $(this).find("input").prop("checked", true).change();
      $(this).addClass("is-active");
      calc.calculate($(this));
      calc.checkTariff($(this));
    }
  }
);
$(".equip-router .tariffs__equipment-wrap").unbind("click");
$(".tariffs__container").on(
  "click",
  ".equip-router .tariffs__equipment-wrap",
  function () {
    if ($(this).find("input").is(":checked")) {
      $(this).find("input").prop("checked", false).change();
      $(this).removeClass("is-active");
      calc.calculate($(this));
      calc.checkTariff($(this));
    } else {
      $(this)
        .parents(".tariffs__additional")
        .find(".equip-router .tariffs__equipment-wrap")
        .each(function () {
          if ($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            $(this).find("input").prop("checked", false).change();
            calc.calculate($(this));
            calc.checkTariff($(this));
          }
        });

      $(this).find("input").prop("checked", true).change();
      $(this).addClass("is-active");
      calc.calculate($(this));
      calc.checkTariff($(this));
    }
  }
);

$(".filter__input_home input")
  .unbind("blur")
  .blur(function () {
    var dropdown = $(this)
      .parents(".filter__wrapper")
      .find(".input__dropdown_house");
    setTimeout(function () {
      dropdown.removeClass("input__dropdown_is-active");
    }, 200);
  });
$(".filter__input_address input")
  .unbind("blur")
  .blur(function () {
    var dropdown = $(this)
      .parents(".filter__wrapper")
      .find(".input__dropdown_street");
    setTimeout(function () {
      dropdown.removeClass("input__dropdown_is-active");
    }, 200);
  });

$("body")
  .off("click", ".input__dropdown_street .input__dropdown-item")
  .on("click", ".input__dropdown_street .input__dropdown-item", function () {
    $(this).parent().removeClass("input__dropdown_is-active");
    stopInputAjax = true;
    $(".filter__input_address input").val($(this).html());
  });

$("body")
  .off("click", ".input__dropdown_house .input__dropdown-item")
  .on("click", ".input__dropdown_house .input__dropdown-item", function () {
    $(this).parent().removeClass("input__dropdown_is-active");
    stopInputAjax = true;
    $(".filter__input_home input").val($(this).html());
  });
