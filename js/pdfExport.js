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

    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "fixed";
    hiddenContainer.style.left = "-9999px";
    hiddenContainer.style.top = "0";
    hiddenContainer.style.width = resumeElement.offsetWidth + "px";
    hiddenContainer.style.height = resumeElement.offsetHeight + "px";
    hiddenContainer.style.overflow = "hidden";

    const clone = resumeElement.cloneNode(true);
    clone.classList.add("print-mode");

    hiddenContainer.appendChild(clone);
    document.body.appendChild(hiddenContainer);

    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r))
    );

    const DESKTOP_WIDTH = 1024;
    const canvas = await html2canvas(clone, {
      useCORS: true,
      scale: 3,
      windowWidth: DESKTOP_WIDTH,
    });

    document.body.removeChild(hiddenContainer);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("resume.pdf");
  },
};
