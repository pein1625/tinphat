// Check is on screen
(function ($) {
  const $window = $(window);

  $.fn.isOnScreen = function (percent = 1) {
    const $el = $(this);
    let scrollTop = $window.scrollTop();
    let screenHeight = $window.outerHeight();
    let offsetTop = $el.offset().top;
    let height = $el.outerHeight();

    return scrollTop > offsetTop - screenHeight + percent * height && scrollTop < offsetTop + (1 - percent) * height;
  };
})(jQuery);

// count To
(function ($) {
  $.fn.countTo = function (options) {
    // merge the default plugin settings with the custom options
    options = $.extend({}, $.fn.countTo.defaults, options || {});

    // how many times to update the value, and how much to increment the value on each update
    var loops = Math.ceil(options.speed / options.refreshInterval),
        increment = (options.to - options.from) / loops;

    return $(this).each(function () {
      var _this = this,
          loopCount = 0,
          value = options.from,
          interval = setInterval(updateTimer, options.refreshInterval);

      function updateTimer() {
        value += increment;
        loopCount++;
        // $(_this).html(value.toFixed(options.decimals));
        $(_this).html(Math.floor(value).toLocaleString("en"));

        if (typeof options.onUpdate == "function") {
          options.onUpdate.call(_this, value);
        }

        if (loopCount >= loops) {
          clearInterval(interval);
          value = options.to;

          if (typeof options.onComplete == "function") {
            options.onComplete.call(_this, value);
          }
        }
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 100, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    onUpdate: null, // callback method for every time the element is updated,
    onComplete: null // callback method for when the element finishes updating
  };
})(jQuery);

jQuery(function ($) {
  // requirement
  if (!$.fn.isOnScreen) {
    console.warn("Jquery.isOnScreen function is required!");
    return;
  }

  const $window = $(window);
  const $count = $(".js-count");

  count();

  $(window).on("scroll", count);

  function count() {
    let vh = $window.outerHeight();
    let scrollTop = $window.scrollTop();

    $count.not(".actived").each(function () {
      let $el = $(this);

      if ($el.isOnScreen(1)) {
        $el.addClass("actived").countTo({
          from: 0,
          to: count,
          speed: 2000,
          refreshInterval: 5
        });
      }
    });
  }
});

// print content
$(function () {
  $(".js-print-content").on("click", function (e) {
    e.preventDefault();

    const target = $(this).data("target") || $(this).attr("href");

    if (!target) {
      console.log("Target Content is not found!");
      return;
    }

    var printContents = document.querySelector(target).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  });
});

$(function () {
  // number input
  $(document).on("input", "[data-type='number'], .js-input-number", function () {
    var val = $(this).val();
    var newVal = val.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

    $(this).val(newVal);
  });

  // quantity
  $(document).on("click", ".quantity__btn", function (e) {
    e.preventDefault();

    var $siblingInput = $(this).siblings(".quantity__input");
    var plus = $(this).data("plus");
    var value = $siblingInput.val();
    var newValue = parseInt(value) + plus;
    var min = $siblingInput.data("min") || 1;

    if (newValue >= min) {
      $siblingInput.val(newValue);
      $siblingInput.trigger("change");
    }
  });

  $(document).on("blur", ".quantity__input", function (e) {
    e.preventDefault();

    if ($(this).val() === "" || $(this).val() === "0") {
      $(this).val(1);
      $(this).trigger("change");
    }
  });
});

// smooth scroll to div
$(function () {
  $(".js-scroll-to").on("click", function (e) {
    e.preventDefault();

    const $el = $(this),
          target = $el.data("target") || $el.attr("href"),
          offset = parseInt($el.data("offset")) || 0,
          duration = parseInt($el.data("duration")) || 800;

    if (!$(target).length) return;

    $("html, body").animate({
      scrollTop: $(target).offset().top - offset
    }, duration);
  });
});

$(function () {
  $(".js-datepicker").datepicker();
});

$(function () {
  $(".js-search-btn").on("click", function (e) {
    e.stopPropagation();
    $(".search").fadeToggle();
  });

  $(".search").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    if ($(window).width() >= 1200) return;

    $(".search").hide();
  });
});

$(function () {
  $(".course-menu__link").on("click", function (e) {
    if ($(window).width() >= 1200) return;

    e.preventDefault();

    $(this).siblings(".course-menu__mega").fadeIn();
    $("body").addClass("overflow-hidden");
  });

  $(".course-menu__close").on("click", function (e) {
    e.preventDefault();
    console.log("abc");

    $(this).closest(".course-menu__mega").fadeOut();
    $("body").removeClass("overflow-hidden");
  });
});

// menu toggle

$(function () {

  $(".menu-toggle").on("click", function () {

    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

    $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

    $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
  });
});

// navbar mobile toggle
$(function () {
  var $body = $("html, body");
  var $navbar = $(".js-navbar");
  var $navbarToggle = $(".js-navbar-toggle");

  $navbarToggle.on("click", function () {
    $navbarToggle.toggleClass("active");
    $navbar.toggleClass("is-show");
    $body.toggleClass("overflow-hidden");
  });
});

// require _scroll-to-dip.js
$(function () {
  var $moveTop = $(".btn-movetop");
  var $window = $(window);

  if (!$moveTop.length) return;

  $window.on("scroll", function () {
    if ($window.scrollTop() > 150) {
      $moveTop.addClass("show");

      return;
    }

    $moveTop.removeClass("show");
  });
});

$(function () {
  $(".sticky-btns__toggle").on("click", function (e) {
    e.preventDefault();

    $(".sticky-btns").toggleClass("active");
  });
});

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find(selector + "__container");

    if (options.navigation) {
      $sliderContainer.addClass("has-nav");
      options.navigation = {
        prevEl: $sliderContainer.find(selector + "__prev"),
        nextEl: $sliderContainer.find(selector + "__next")
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass("has-pagination");
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  const bannerSlider = addSwiper(".banner-slider", {
    init: false,
    navigation: true,
    loop: true,
    speed: 800,
    slidesPerView: 1,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    }
  })[0];

  if (!bannerSlider) return;

  setTimeout(function () {
    bannerSlider.init();
  }, 2000);
});