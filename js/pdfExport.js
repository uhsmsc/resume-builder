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

    const oldFontSize = resumeElement.style.fontSize;
    resumeElement.style.fontSize = '16px';

    const canvas = await html2canvas(resumeElement, {
      scale: 1,
      useCORS: true,
      svgRendering: true,
      windowWidth: 1440
    });

    resumeElement.style.fontSize = oldFontSize;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfW = 210;
    const pdfH = 297;
    const ratio = canvas.width / canvas.height;
    let imgW = pdfW;
    let imgH = pdfW / ratio;
    if (imgH > pdfH) {
      imgH = pdfH;
      imgW = pdfH * ratio;
    }

    const x = (pdfW - imgW) / 2;
    const y = (pdfH - imgH) / 2;

    pdf.addImage(imgData, 'PNG', x, y, imgW, imgH);
    pdf.save('resume.pdf');
  },
};
