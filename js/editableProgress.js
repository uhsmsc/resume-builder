const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function createInputHTML(value) {
  return `
    <div class="progress-edit">
      <input
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        value="${value}"
        class="progress-input"
        maxlength="3"
      />
      <span class="progress-percent">%</span>
    </div>
  `;
}

export const editableProgress = {
  init(storage) {
    document.addEventListener("click", (e) => {
      const progressEl = e.target.closest(".languages__progress");
      if (!progressEl) return;

      if (progressEl.querySelector("input")) return;

      const allProgress = document.querySelectorAll(".languages__progress");
      allProgress.forEach((el) => {
        if (el === progressEl) return;
        const input = el.querySelector("input");
        if (input) {
          const val = clamp(Number(input.value) || 0, 0, 100);
          const idx = [...allProgress].indexOf(el);
          const key = storage.key("progress", idx);
          storage.set(key, val);
          el.dataset.percent = val;
          el.innerHTML = `<div class="languages__progress-bar" style="width:${val}%"></div>`;
        }
      });

      const index = [...allProgress].indexOf(progressEl);
      const key = storage.key("progress", index);

      const currentValue = parseInt(progressEl.dataset.percent || 0, 10);
      progressEl.innerHTML = createInputHTML(currentValue);

      const input = progressEl.querySelector("input");
      input.focus();
      setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);

      const save = () => {
        const value = clamp(Number(input.value) || 0, 0, 100);
        progressEl.dataset.percent = value;
        storage.set(key, value);
        progressEl.innerHTML = `<div class="languages__progress-bar" style="width:${value}%"></div>`;
      };

      input.addEventListener("blur", save);
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") input.blur();
      });
    });
  },
};
