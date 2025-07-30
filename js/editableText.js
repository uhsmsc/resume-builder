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

export const editableText = {
  init(storage) {
    const elements = document.querySelectorAll(selectors.join(", "));
    elements.forEach((el, index) => {
      el.contentEditable = "true";
      el.classList.add("editable");

      const key = storage.key("text", index);
      const saved = storage.get(key);
      if (saved) el.textContent = saved;

      el.addEventListener("blur", () =>
        storage.set(key, el.textContent.trim())
      );
    });
  },
};
