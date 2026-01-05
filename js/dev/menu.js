import { b as bodyLockStatus, a as bodyLockToggle, c as bodyUnlock } from "./common.min.js";
function menuInit() {
  document.addEventListener("click", function(e) {
    if (bodyLockStatus && e.target.closest("[data-fls-menu]")) {
      bodyLockToggle();
      document.documentElement.toggleAttribute("data-fls-menu-open");
    } else if (!e.target.closest("[data-fls-menu]") && !e.target.closest(".menu") && !e.target.closest("[data-fls-popup]")) {
      bodyUnlock();
      document.documentElement.removeAttribute("data-fls-menu-open");
    } else if (e.target.closest(".menu__link")) {
      bodyUnlock();
      document.documentElement.removeAttribute("data-fls-menu-open");
    }
  });
}
document.querySelector("[data-fls-menu]") ? window.addEventListener("load", menuInit) : null;
