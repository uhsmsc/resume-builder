export const pdfExport = {
  init() {
    const btn = document.getElementById("exportPdfBtn");
    if (!btn) return;
    btn.addEventListener("click", this.exportPdf.bind(this));
  },

  async exportPdf() {
    const { jsPDF } = window.jspdf;
    const resumeElement = document.querySelector(".resume");
    if (!resumeElement) return;

    const html = document.documentElement;
    const oldFontSize = html.style.fontSize;
    html.style.fontSize = "16px";

    const canvas = await html2canvas(resumeElement, {
      scale: 4,
      useCORS: true,
      windowWidth: 1440,
    });

    html.style.fontSize = oldFontSize;

    const imgData = canvas.toDataURL("image/png");

    const pxToMm = px => px * 25.4 / 96;

    const imgWidthMm = pxToMm(canvas.width);
    const imgHeightMm = pxToMm(canvas.height);

    const pdf = new jsPDF("p", "mm", [imgWidthMm, imgHeightMm]);

    pdf.addImage(imgData, "PNG", 0, 0, imgWidthMm, imgHeightMm);
    pdf.save("resume.pdf");
  },
};
