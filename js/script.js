//анимация элементов при загрузке
document.addEventListener("DOMContentLoaded", function () {
  $(".elements--js").toggleClass("elements--active");
});

$(document).ready(function () {
  //плавная прокрутка
  $('nav a').on("click", function (e) {
    e.preventDefault();

    $("#header__toggle").removeClass("active");
    $(".menu--js").removeClass("active");
    let href = $(this).attr("href");
    let headerHeight = $(".header").height();
    let offset = $(href).offset().top - headerHeight;

    $("body,html").animate({
      scrollTop: offset,
    }, 700);
  })

  //раскрытие/закрытие меню и её анимация
  let toggle = document.querySelector("#header__toggle");

  $(toggle).click(function (event) {
    $(toggle).toggleClass("active");
    $(".menu--js").toggleClass("active");
  });

  //слайдер
  let mySwiper = new Swiper(".slider", {
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1230.1: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    loop: true,
    wrapperClass: "slider__list",
    slideClass: "slider__item",
    pagination: {
      el: ".slider__pagination",
      type: "bullets",
      bulletClass: "paginator__item",
      bulletActiveClass: "paginator__item--active",
      clickable: true,
    },
    a11y: {
      prevSlideMessage: "Предыдущий слайд",
      nextSlideMessage: "Следующий слайд",
      paginationBulletMessage: "Переход к {{index}} слайду",
    },
    navigation: {
      nextEl: ".slider__button--next",
      prevEl: ".slider__button--prev",
    },
  });
});

//функция закрытия м.о.
function closedForm() {
  $(".row-js").removeClass("error");
  $("#modal").removeClass("active");
  setTimeout(function () {
    $("body").removeClass("overflow__hidden-js");
    $(".overlay-js").removeClass("active");
    $("#enter").attr("disabled", true);
    $(".overlay-js").attr("aria-hidden", true);
    lastFocus.focus();
  }, 350);
}

var lastFocus;

//вызов модального окна
$(".open-js").on("click", function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();

  lastFocus = document.activeElement;
  $(".overlay-js").addClass("active");
  $(".overlay-js").attr("aria-hidden", false);
  $("#name").focus();
  setTimeout(function () {
    $("#modal").addClass("active");
    $("body").addClass("overflow__hidden-js");
  }, 350);

  //закрытие м.о. по клику в пустой области
  $(document).on("mousedown", function (e) {
    let target = $(e.target);

    if ($(target).hasClass("overlay-js")) {
      $(closedForm());
    }
  });
});

//закрытие м.о. при нажатии кнопки *закрыть*
$("#close").on("click", function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();

  $(closedForm());
});

$(this).keydown(function (eventObject) {
  if (eventObject.which == 27) {
    $(closedForm());
  }
});

//проверка полей на соответствие формату
function chekedName() {
  //имя
  let patternName = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
  let name = $("#name").val();

  if (!patternName.test(name)) {
    if (!name == "") {
      $(".row--1").addClass("error");
      return false;
    } else {
      $(".row--1").removeClass("error");
      return false;
    }
  } else {
    $(".row--1").removeClass("error");
    return true;
  }
}

function chekedPhone() {
  //телефон
  let patternTel = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;
  let tel = $("#phone").val();

  if (!patternTel.test(tel)) {
    if (!tel == "") {
      $(".row--2").addClass("error");
      return false;
    } else {
      $(".row--2").removeClass("error");
      return false;
    }
  } else {
    $(".row--2").removeClass("error");
    return true;
  }
}

function chekedEmail() {
  //емайл
  let patternEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  let email = $("#email").val();

  if (!patternEmail.test(email)) {
    if (!email == "") {
      $(".row--3").addClass("error");
      return false;
    } else {
      $(".row--3").removeClass("error");
      return false;
    }
  } else {
    $(".row--3").removeClass("error");
    return true;
  }
}

//проверка полей при изменении и т.д.
$(".row-js").on("input", function () {
  const isChekedName = chekedName();
  const isChekedPhone = chekedPhone();
  const isChekedEmail = chekedEmail();

  if (isChekedName && isChekedPhone && isChekedEmail) {
    $("#enter").removeAttr("disabled");
  } else {
    $("#enter").attr("disabled", true);
  }
});

//отправка формы
$("#enter").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  const $form = $(".form-js");
  $.post($form.attr("action"), $form.serialize());

  $("#enter").show();

  $(".row-js").removeClass("error");
  $("#modal").removeClass("active");
  $(".closed-js").addClass("active");
  setTimeout(function () {
    $("body").removeClass("overflow__hidden-js");
    $(".closed-js").removeClass("active");
    $(".overlay-js").removeClass("active");
    $(".row-js").val("");
    $("#enter").attr("disabled", true);
    $(".overlay-js").attr("aria-hidden", true);
    lastFocus.focus();
  }, 3050);
  return false;
});

//проверка на отображение webp браузером
function testWebP(callback) {

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

//от перехвата таргета
/*var otherWindow = window.open();
otherWindow.opener = null;
otherWindow.location = targetUrl;*/
