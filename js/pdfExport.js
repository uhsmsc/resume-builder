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

    resumeElement.querySelectorAll("img").forEach(img => {
      const cs = window.getComputedStyle(img);
      img.width  = parseFloat(cs.width);
      img.height = parseFloat(cs.height);
    });

    const canvas = await html2canvas(resumeElement, {
      scale: 3,           
      useCORS: true,
      svgRendering: true,
      windowWidth: 1440      
    });

    const pxToMm = px => px * 25.4 / 96; 
    const imgWidthMm  = pxToMm(canvas.width);
    const imgHeightMm = pxToMm(canvas.height);

    const pdf = new jsPDF("p", "mm", [imgWidthMm, imgHeightMm]);
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, imgWidthMm, imgHeightMm);
    pdf.save("resume.pdf");
  },
};
