import { editableText } from "./editableText.js";
import { editableProgress } from "./editableProgress.js";
import { rippleEffect } from "./rippleEffect.js";
import { pdfExport } from "./pdfExport.js";

const storage = {
  key: (type, id) => `resume_${type}_${id}`,
  set: (key, value) => localStorage.setItem(key, value),
  get: (key) => localStorage.getItem(key),
};

document.addEventListener("DOMContentLoaded", () => {
  editableText.init(storage);
  editableProgress.init(storage);
  rippleEffect.init();
  pdfExport.init();
});
