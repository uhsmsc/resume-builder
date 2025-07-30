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

    const media = resumeElement.querySelectorAll("img, svg");
    await Promise.all(
      Array.from(media).map(el => {
        if (el.tagName === "IMG") {
          return el.complete
            ? Promise.resolve()
            : new Promise(r => { el.onload = el.onerror = r; });
        } else {

          return Promise.resolve();
        }
      })
    );

    const canvas = await html2canvas(resumeElement, {
      scale: 1,
      useCORS: true,
      svgRendering: true,
      windowWidth: 1440
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = 297;
    const ratio = canvas.width / canvas.height;

    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth / ratio;
    if (imgHeight > pdfHeight) {
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * ratio;
    }

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("resume.pdf");
  },
};
