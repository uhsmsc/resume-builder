const selectors = [
  ".intro__greeting",
  ".intro__name",
  ".intro__profession",
  ".languages__title",
  ".languages__name",
  ".experience__title",
  ".experience__dates",
  ".experience__position",
  ".experience__type",
  ".experience__detail",
  ".tools__title",
  ".tools__category-title",
  ".education__title",
  ".education__year-text",
  ".education__course",
  ".education__tags",
  ".education__place",
  ".interests__title",
  ".interests__item",
  ".contact__title",
  ".contact__email",
];

const maxLengths = {
  ".intro__greeting": 40,
  ".intro__name": 50,
  ".intro__profession": 40,
  ".languages__title": 20,
  ".languages__name": 25,
  ".experience__title": 30,
  ".experience__dates": 25,
  ".experience__position": 30,
  ".experience__type": 25,
  ".experience__detail": 300,
  ".tools__title": 15,
  ".tools__category-title": 20,
  ".education__title": 25,
  ".education__year-text": 15,
  ".education__course": 40,
  ".education__tags": 160,
  ".education__place": 60,
  ".interests__title": 20,
  ".interests__item": 30,
  ".contact__title": 80,
  ".contact__email": 50
};

export const editableText = {
  init(storage) {
    const elements = document.querySelectorAll(selectors.join(", "));
    elements.forEach((el, index) => {
      el.contentEditable = "true";
      el.classList.add("editable");

      const key = storage.key("text", index);
      const saved = storage.get(key);
      if (saved) el.textContent = saved;

      el.addEventListener("input", () => {
        const selector = selectors.find(sel => el.matches(sel));
        const maxLength = maxLengths[selector] || 200;

        // Ограничение по символам
        if (el.textContent.length > maxLength) {
          el.textContent = el.textContent.slice(0, maxLength);
          placeCaretAtEnd(el); // чтобы курсор не прыгал
          el.classList.add("limit-reached");
          setTimeout(() => el.classList.remove("limit-reached"), 200);
        }
      });

      el.addEventListener("blur", () =>
        storage.set(key, el.textContent.trim())
      );
    });
  },
};

function placeCaretAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}
