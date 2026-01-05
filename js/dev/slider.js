import { S as Swiper, N as Navigation, P as Pagination } from "./swiper.min.js";
function toggleLockSliderClass(swiper) {
  const nextBtn = swiper.el.parentElement.querySelector(".swiper-button-next");
  const pagination = swiper.el.parentElement.querySelector(".swiper-pagination");
  const myBlock = swiper.el.parentElement.querySelector("[data-swiper-lock]");
  if (!myBlock) return;
  if (nextBtn && nextBtn.classList.contains("swiper-button-lock") || pagination && pagination.classList.contains("swiper-pagination-lock")) {
    myBlock.classList.add("swiper-block-lock");
  } else {
    myBlock.classList.remove("swiper-block-lock");
  }
}
function initSliders() {
  if (document.querySelector(".categories-block__slider")) {
    new Swiper(".categories-block__slider", {
      // <- Вказуємо склас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [Navigation, Pagination],
      observer: true,
      observeParents: true,
      slidesPerView: 4,
      spaceBetween: 24,
      //autoHeight: true,
      speed: 800,
      //touchRatio: 0,
      //simulateTouch: false,
      //loop: true,
      //preloadImages: false,
      //lazy: true,
      /*
      // Ефекти
      effect: 'fade',
      autoplay: {
      	delay: 3000,
      	disableOnInteraction: false,
      },
      */
      // Пагінація
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      // Скроллбар
      /*
      scrollbar: {
      	el: '.swiper-scrollbar',
      	draggable: true,
      },
      */
      // Кнопки "вліво/вправо"
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next"
      },
      // Брейкпоінти
      breakpoints: {
        319: {
          slidesPerView: 1.1,
          spaceBetween: 24
        },
        369.98: {
          slidesPerView: 1.3,
          spaceBetween: 24
        },
        479.98: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        767.98: {
          slidesPerView: 3,
          spaceBetween: 24
        },
        991.98: {
          slidesPerView: 4,
          spaceBetween: 24
        }
      },
      // Події
      on: {
        init(sw) {
          toggleLockSliderClass(this);
        },
        slideChange(sw) {
          toggleLockSliderClass(this);
        },
        resize(sw) {
          toggleLockSliderClass(this);
        }
      }
    });
  }
  if (document.querySelector(".bonus-program__slider")) {
    document.querySelectorAll(".bonus-program__slider").forEach((el) => {
      const parentSlider = el.parentElement;
      const swiperNextBtn = parentSlider.querySelector(".swiper-button-next");
      const swiperPrevBtn = parentSlider.querySelector(".swiper-button-prev");
      parentSlider.querySelector(".swiper-pagination");
      new Swiper(el, {
        modules: [Navigation],
        observer: true,
        observeParents: true,
        slidesPerView: 2.1,
        spaceBetween: 48,
        speed: 800,
        // Кнопки "вліво/вправо"
        navigation: {
          prevEl: swiperPrevBtn,
          nextEl: swiperNextBtn
        },
        // Брейкпоінти
        breakpoints: {
          319: {
            slidesPerView: 1.1,
            spaceBetween: 16
          },
          369.98: {
            slidesPerView: 1.3,
            spaceBetween: 16
          },
          549.98: {
            slidesPerView: 1.9,
            spaceBetween: 16
          },
          991.98: {
            slidesPerView: 2.25,
            spaceBetween: 48
          }
        },
        // Події
        on: {
          init(sw) {
            toggleLockSliderClass(this);
          },
          slideChange(sw) {
            toggleLockSliderClass(this);
          },
          resize(sw) {
            toggleLockSliderClass(this);
          }
        }
      });
    });
  }
  if (document.querySelector(".news__slider")) {
    document.querySelectorAll(".news__slider").forEach((el) => {
      const parentSlider = el.parentElement;
      const swiperNextBtn = parentSlider.querySelector(".swiper-button-next");
      const swiperPrevBtn = parentSlider.querySelector(".swiper-button-prev");
      parentSlider.querySelector(".swiper-pagination");
      new Swiper(el, {
        modules: [Navigation],
        observer: true,
        observeParents: true,
        slidesPerView: 4,
        spaceBetween: 24,
        speed: 800,
        // Кнопки "вліво/вправо"
        navigation: {
          prevEl: swiperPrevBtn,
          nextEl: swiperNextBtn
        },
        // Брейкпоінти
        breakpoints: {
          319: {
            slidesPerView: 1.1,
            spaceBetween: 16
          },
          369.98: {
            slidesPerView: 1.4,
            spaceBetween: 16
          },
          549.98: {
            slidesPerView: 2,
            spaceBetween: 16
          },
          767.98: {
            slidesPerView: 3,
            spaceBetween: 16
          },
          991.98: {
            slidesPerView: 4,
            spaceBetween: 24
          }
        },
        // Події
        on: {
          init(sw) {
            toggleLockSliderClass(this);
          },
          slideChange(sw) {
            toggleLockSliderClass(this);
          },
          resize(sw) {
            toggleLockSliderClass(this);
          }
        }
      });
    });
  }
  if (document.querySelector(".text-section__cases-slider")) {
    document.querySelectorAll(".text-section__cases-slider").forEach((el) => {
      const parentSlider = el.parentElement;
      const swiperNextBtn = parentSlider.querySelector(".swiper-button-next");
      const swiperPrevBtn = parentSlider.querySelector(".swiper-button-prev");
      parentSlider.querySelector(".swiper-pagination");
      new Swiper(el, {
        modules: [Navigation],
        observer: true,
        observeParents: true,
        slidesPerView: 2.4,
        spaceBetween: 16,
        speed: 800,
        // Кнопки "вліво/вправо"
        navigation: {
          prevEl: swiperPrevBtn,
          nextEl: swiperNextBtn
        },
        // Брейкпоінти
        breakpoints: {
          319: {
            slidesPerView: 1.1,
            spaceBetween: 16
          },
          369.98: {
            slidesPerView: 1.4,
            spaceBetween: 16
          },
          549.98: {
            slidesPerView: 1.8,
            spaceBetween: 16
          },
          649.98: {
            slidesPerView: 2,
            spaceBetween: 16
          },
          991.98: {
            slidesPerView: 2.4,
            spaceBetween: 16
          }
        },
        // Події
        on: {
          init(sw) {
            toggleLockSliderClass(this);
          },
          slideChange(sw) {
            toggleLockSliderClass(this);
          },
          resize(sw) {
            toggleLockSliderClass(this);
          }
        }
      });
    });
  }
}
document.querySelector("[data-fls-slider]") ? window.addEventListener("load", initSliders) : null;
