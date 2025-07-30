import fs from "fs";
import path from "path";

const stylesDir = path.join(process.cwd(), "styles");

const distDir = path.join(process.cwd(), "dist");

const outputFile = path.join(distDir, "style.css");

const filesOrder = [
  'fonts.css',
  'base.css',
  'header.css',
  'sections/photo.css',
  'sections/intro.css',
  'sections/languages.css',
  'sections/experience.css',
  'sections/tools.css',
  'sections/education.css',
  'sections/interests.css',
  'sections/contact.css',
  'effects.css',
  'media.css'
];

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
  console.log("📁 Папка dist создана");
}

let combinedCSS = "";

filesOrder.forEach((file) => {
  const filePath = path.join(stylesDir, file);
  if (fs.existsSync(filePath)) {
    const cssContent = fs.readFileSync(filePath, "utf8");
    combinedCSS += `\n/* ===== ${file} ===== */\n` + cssContent;
  } else {
    console.warn(`Файл не найден: ${filePath}`);
  }
});

fs.writeFileSync(outputFile, combinedCSS, "utf8");
console.log(`CSS собран в ${outputFile}`);
