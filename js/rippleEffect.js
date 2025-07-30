const selectors = [
  ".intro",
  ".languages",
  ".experience__item",
  ".education__item",
  ".tools",
  ".interests__item",
];

export const rippleEffect = {
  init() {
    const elements = document.querySelectorAll(selectors.join(","));
    elements.forEach((el) => el.classList.add("ripple"));

    document.addEventListener("click", (e) => {
      const target = e.target.closest(".ripple");
      if (!target) return;

      const circle = document.createElement("span");
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;

      circle.classList.add("ripple-effect");
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${
        e.clientX - target.getBoundingClientRect().left - radius
      }px`;
      circle.style.top = `${
        e.clientY - target.getBoundingClientRect().top - radius
      }px`;

      target.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  },
};
