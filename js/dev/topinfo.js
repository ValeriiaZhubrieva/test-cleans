const topInfoBlocs = document.querySelectorAll(".topinfo");
if (topInfoBlocs.length) {
  topInfoBlocs.forEach((block) => {
    const topInfoClose = block.querySelector(".topinfo__close");
    topInfoClose.addEventListener("click", () => {
      block.classList.add("hide");
    });
  });
}
