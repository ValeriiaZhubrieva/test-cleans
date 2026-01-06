const topPositionBlocks = document.querySelectorAll("[data-top-position]");
if (topPositionBlocks.length) {
  let updateTopPositions = function() {
    const headerHeight = header ? header.offsetHeight : 0;
    topPositionBlocks.forEach((block) => {
      const blockRect = block.getBoundingClientRect();
      const topPosition = Math.max(headerHeight, blockRect.top);
      block.style.setProperty("--top-position", `${topPosition}px`);
      block.style.setProperty("--header-height", `${headerHeight}px`);
    });
  };
  var updateTopPositions2 = updateTopPositions;
  const header = document.querySelector("header");
  updateTopPositions();
  window.addEventListener("scroll", updateTopPositions);
  window.addEventListener("resize", updateTopPositions);
  if (header) {
    if ("ResizeObserver" in window) {
      const headerObserver = new ResizeObserver(updateTopPositions);
      headerObserver.observe(header);
    }
    if ("MutationObserver" in window) {
      const observeTarget = document.body;
      const mutationObserver = new MutationObserver(updateTopPositions);
      mutationObserver.observe(observeTarget, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class", "hidden"]
      });
    }
  }
}
const videoBlock = document.querySelectorAll(".video-block");
if (videoBlock.length) {
  videoBlock.forEach((block) => {
    const videoPlay = block.querySelector(".video-block__play");
    const videoBlockVideo = block.querySelector(".video-block video");
    if (!videoPlay || !videoBlockVideo) return;
    videoPlay.addEventListener("click", () => {
      block.classList.add("video-play");
      videoBlockVideo.controls = true;
      videoBlockVideo.play();
    });
    videoBlockVideo.addEventListener("play", () => {
      block.classList.add("video-play");
      videoBlockVideo.controls = true;
    });
    videoBlockVideo.addEventListener("pause", () => {
      block.classList.remove("video-play");
      videoBlockVideo.controls = false;
    });
    videoBlockVideo.addEventListener("ended", () => {
      block.classList.remove("video-play");
      videoBlockVideo.controls = false;
    });
  });
}
window.stepsFormBlock = function() {
  const forms = document.querySelectorAll("[data-form-steps]");
  if (forms.length) {
    forms.forEach((form) => {
      const steps = form.querySelectorAll("[data-form-step]");
      const prevBtns = form.querySelectorAll("[data-steps-prev]");
      const nextBtns = form.querySelectorAll("[data-steps-next]");
      const firstStepBtns = form.querySelectorAll("[data-steps-first]");
      const openStepBtns = document.querySelectorAll("[data-open-step]");
      let isAnimating = false;
      function isStepsAnimate(form2) {
        if (form2.hasAttribute("data-steps-animate")) {
          return form2.dataset.stepsAnimate > 0 ? Number(form2.dataset.stepsAnimate) : 500;
        }
      }
      const stepsAnimate = isStepsAnimate(form);
      function getCurrentStepIndex() {
        let activeIndex = 0;
        steps.forEach((step, index) => {
          if (step.classList.contains("is-active")) {
            activeIndex = index;
          }
        });
        return activeIndex;
      }
      function flipOut(target, duration = 500) {
        return new Promise((resolve) => {
          target.style.display = "flex";
          target.style.transformStyle = "preserve-3d";
          target.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease`;
          target.style.transform = "rotateY(0deg)";
          target.style.opacity = "1";
          requestAnimationFrame(() => {
            target.style.transform = "rotateY(-90deg)";
            target.style.opacity = "0";
          });
          setTimeout(() => {
            target.style.display = "none";
            target.style.removeProperty("transform");
            target.style.removeProperty("opacity");
            target.style.removeProperty("transition");
            target.style.removeProperty("transform-style");
            resolve();
          }, duration);
        });
      }
      function flipIn(target, duration = 500) {
        return new Promise((resolve) => {
          target.style.display = "flex";
          target.style.transformStyle = "preserve-3d";
          target.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease`;
          target.style.transform = "rotateY(90deg)";
          target.style.opacity = "0";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              target.style.transform = "rotateY(0deg)";
              target.style.opacity = "1";
            });
          });
          setTimeout(() => {
            target.style.removeProperty("transform");
            target.style.removeProperty("opacity");
            target.style.removeProperty("transition");
            target.style.removeProperty("transform-style");
            resolve();
          }, duration);
        });
      }
      async function goToStep(targetIndex) {
        if (isAnimating || targetIndex < 0 || targetIndex >= steps.length) return;
        const currentIndex2 = getCurrentStepIndex();
        if (currentIndex2 === targetIndex) return;
        isAnimating = true;
        steps[currentIndex2];
        const targetStep = steps[targetIndex];
        const currentHeight = form.offsetHeight;
        targetStep.style.display = "flex";
        targetStep.style.opacity = "0";
        targetStep.style.position = "absolute";
        const targetHeight = targetStep.offsetHeight;
        targetStep.style.display = "none";
        targetStep.style.removeProperty("opacity");
        targetStep.style.removeProperty("position");
        form.style.height = currentHeight + "px";
        form.style.overflow = "hidden";
        if (stepsAnimate) {
          form.style.transition = `height ${stepsAnimate}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        }
        const promises = [];
        steps.forEach((step, index) => {
          if (index === targetIndex) {
            step.classList.add("is-active");
            if (stepsAnimate) {
              promises.push(flipIn(step, stepsAnimate));
            } else {
              step.style.display = "flex";
            }
          } else if (step.classList.contains("is-active")) {
            step.classList.remove("is-active");
            if (stepsAnimate) {
              promises.push(flipOut(step, stepsAnimate));
            } else {
              step.style.display = "none";
            }
          }
        });
        requestAnimationFrame(() => {
          form.style.height = targetHeight + "px";
        });
        await Promise.all(promises);
        form.style.removeProperty("height");
        form.style.removeProperty("overflow");
        form.style.removeProperty("transition");
        isAnimating = false;
      }
      prevBtns.forEach((prevBtn) => {
        prevBtn.addEventListener("click", () => {
          const currentIndex2 = getCurrentStepIndex();
          if (currentIndex2 > 0) {
            goToStep(currentIndex2 - 1);
          }
        });
      });
      nextBtns.forEach((nextBtn) => {
        nextBtn.addEventListener("click", () => {
          const currentIndex2 = getCurrentStepIndex();
          if (currentIndex2 < steps.length - 1) {
            goToStep(currentIndex2 + 1);
          }
        });
      });
      firstStepBtns.forEach((firstStepBtn) => {
        firstStepBtn.addEventListener("click", () => {
          goToStep(0);
        });
      });
      openStepBtns.forEach((openStepBtn) => {
        openStepBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const targetFormId = openStepBtn.dataset.openStep;
          const stepIndex = parseInt(openStepBtn.dataset.stepIndex);
          if (form.dataset.formSteps === targetFormId && !isNaN(stepIndex)) {
            goToStep(stepIndex);
          }
        });
      });
      const currentIndex = getCurrentStepIndex();
      steps.forEach((step, index) => {
        if (index === currentIndex) {
          step.classList.add("is-active");
          step.style.display = "flex";
        } else {
          step.classList.remove("is-active");
          step.style.display = "none";
        }
      });
    });
  }
};
if (document.querySelector("[data-form-steps]")) {
  stepsFormBlock();
}
function initTooltips() {
  const tooltips = document.querySelectorAll(".tooltip-block");
  tooltips.forEach((tooltip) => {
    const anchor = tooltip.querySelector(".tooltip-block__anchor");
    const dropdown = tooltip.querySelector(".tooltip-block__dropdown");
    const closeBtn = tooltip.querySelector(".tooltip-block__close");
    function positionDropdown() {
      let offsetParent = tooltip.offsetParent;
      while (offsetParent) {
        const style = window.getComputedStyle(offsetParent);
        if (style.position !== "static" || style.transform !== "none") {
          break;
        }
        offsetParent = offsetParent.offsetParent;
      }
      const anchorRect = anchor.getBoundingClientRect();
      const parentRect = offsetParent ? offsetParent.getBoundingClientRect() : { top: 0, left: 0 };
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const content = dropdown.querySelector(".tooltip-block__content");
      const oldArrow = dropdown.querySelector(".tooltip-block__arrow");
      if (oldArrow) oldArrow.remove();
      dropdown.style.position = "absolute";
      dropdown.style.left = "0";
      dropdown.style.top = "0";
      dropdown.style.maxHeight = "none";
      if (content) {
        content.style.maxHeight = "none";
        content.style.overflowY = "visible";
      }
      dropdown.offsetHeight;
      const dropdownRect = dropdown.getBoundingClientRect();
      const margin = 20;
      const head = dropdown.querySelector(".tooltip-block__head");
      const headHeight = head ? head.getBoundingClientRect().height : 0;
      const dropdownStyles = window.getComputedStyle(dropdown);
      const dropdownPadding = (parseInt(dropdownStyles.paddingTop) || 0) + (parseInt(dropdownStyles.paddingBottom) || 0);
      const spaceBelow = viewportHeight - anchorRect.bottom - margin;
      const spaceAbove = anchorRect.top - margin;
      let top;
      let maxDropdownHeight = null;
      let maxContentHeight = null;
      let showBelow = true;
      if (dropdownRect.height + 8 <= spaceBelow) {
        top = anchorRect.bottom - parentRect.top + 8;
        showBelow = true;
      } else if (dropdownRect.height + 8 <= spaceAbove) {
        top = anchorRect.top - parentRect.top - dropdownRect.height - 8;
        showBelow = false;
      } else if (spaceBelow >= spaceAbove) {
        top = anchorRect.bottom - parentRect.top + 8;
        maxDropdownHeight = Math.floor(spaceBelow - 8);
        maxContentHeight = Math.floor(maxDropdownHeight - headHeight - dropdownPadding);
        showBelow = true;
      } else {
        maxDropdownHeight = Math.floor(spaceAbove - 8);
        maxContentHeight = Math.floor(maxDropdownHeight - headHeight - dropdownPadding);
        top = anchorRect.top - parentRect.top - maxDropdownHeight - 8;
        showBelow = false;
      }
      const anchorCenter = anchorRect.left + anchorRect.width / 2;
      let desiredLeftViewport = anchorCenter - dropdownRect.width / 2;
      const minLeftViewport = margin;
      const maxLeftViewport = viewportWidth - dropdownRect.width - margin;
      let left;
      if (desiredLeftViewport >= minLeftViewport && desiredLeftViewport <= maxLeftViewport) {
        left = desiredLeftViewport - parentRect.left;
      } else if (desiredLeftViewport < minLeftViewport) {
        left = minLeftViewport - parentRect.left;
      } else {
        left = maxLeftViewport - parentRect.left;
      }
      dropdown.style.top = `${Math.floor(top)}px`;
      dropdown.style.left = `${Math.floor(left)}px`;
      dropdown.style.zIndex = "1000";
      if (maxDropdownHeight !== null && maxDropdownHeight > 0) {
        dropdown.style.maxHeight = `${maxDropdownHeight}px`;
        if (content && maxContentHeight > 0) {
          content.style.maxHeight = `${maxContentHeight}px`;
          content.style.overflowY = "auto";
          content.style.flex = "1 1 auto";
        }
      } else {
        dropdown.style.maxHeight = "none";
        if (content) {
          content.style.maxHeight = "none";
          content.style.overflowY = "visible";
          content.style.flex = "";
        }
      }
      const arrow = document.createElement("div");
      arrow.className = "tooltip-block__arrow";
      const dropdownLeftViewport = parentRect.left + left;
      let arrowLeft = anchorCenter - dropdownLeftViewport - 6;
      arrowLeft = Math.max(12, Math.min(arrowLeft, dropdownRect.width - 24));
      arrow.style.left = `${arrowLeft}px`;
      if (showBelow) {
        arrow.classList.add("tooltip-block__arrow--top");
      } else {
        arrow.classList.add("tooltip-block__arrow--bottom");
      }
      dropdown.appendChild(arrow);
    }
    function openTooltip(e) {
      e.stopPropagation();
      document.querySelectorAll(".tooltip-block").forEach((t) => {
        if (t !== tooltip) {
          t.classList.remove("is-active");
        }
      });
      tooltip.classList.add("is-active");
      requestAnimationFrame(() => {
        positionDropdown();
      });
    }
    function closeTooltip(e) {
      if (e) e.stopPropagation();
      tooltip.classList.remove("is-active");
    }
    anchor.addEventListener("click", openTooltip);
    closeBtn.addEventListener("click", closeTooltip);
    document.addEventListener("click", (e) => {
      if (!tooltip.contains(e.target)) {
        closeTooltip();
      }
    });
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (tooltip.classList.contains("is-active")) {
          positionDropdown();
        }
      }, 100);
    });
    window.addEventListener(
      "scroll",
      () => {
        if (tooltip.classList.contains("is-active")) {
          positionDropdown();
        }
      },
      true
    );
    positionDropdown();
  });
}
if (document.querySelector(".tooltip-block")) {
  initTooltips();
}
document.addEventListener("DOMContentLoaded", () => {
  const totalElements = document.querySelectorAll(".fixed-block-hide");
  const fixedElement = document.querySelector(".fixed-block");
  if (!totalElements.length || !fixedElement) return;
  const observer = new IntersectionObserver(
    (entries) => {
      let anyVisible = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anyVisible = true;
        }
      });
      if (anyVisible) {
        fixedElement.classList.add("hide");
      } else {
        fixedElement.classList.remove("hide");
      }
    },
    { threshold: 0.1 }
  );
  totalElements.forEach((el) => observer.observe(el));
});
const videoBlockPreview = document.querySelectorAll("[data-video-autoplay]");
if (videoBlockPreview.length) {
  videoBlockPreview.forEach((block) => {
    const videoBlockPreviewVideo = block.querySelector("video");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoBlockPreviewVideo.play().catch(() => {
            });
          } else {
            videoBlockPreviewVideo.pause();
            videoBlockPreviewVideo.currentTime = 0;
          }
        });
      },
      {
        threshold: 0.2
      }
    );
    observer.observe(block);
  });
}
