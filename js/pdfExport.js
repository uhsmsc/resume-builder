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

    const DESKTOP_WIDTH = 1024;

    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "fixed";
    hiddenContainer.style.left = "-9999px";
    hiddenContainer.style.top = "0";
    hiddenContainer.style.width = DESKTOP_WIDTH + "px";

    const clone = resumeElement.cloneNode(true);
    clone.classList.add("print-mode");
    hiddenContainer.appendChild(clone);
    document.body.appendChild(hiddenContainer);

    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r))
    );

    const canvas = await html2canvas(clone, {
      useCORS: true,
      scale: 3,
      width: DESKTOP_WIDTH,
      windowWidth: DESKTOP_WIDTH,
    });

    document.body.removeChild(hiddenContainer);

    const a4Width = 794;
    const a4Height = 1123;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [a4Width, a4Height],
    });

    const imgData = canvas.toDataURL("image/png");

    const scale = a4Height / canvas.height;
    const imgHeight = a4Height;
    const imgWidth = canvas.width * scale;

    const x = 0;
    const y = 0;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    pdf.save("resume.pdf");
  },
};
