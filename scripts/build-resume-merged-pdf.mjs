import path from "node:path";
import { chromium } from "playwright";

const rootDir = process.cwd();
const htmlPath = path.join(rootDir, "index_merged.html");
const pdfPath = path.join(rootDir, "Resume - Matt Idell (Merged).pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle", timeout: 30000 });
await page.evaluate(async () => {
  await document.fonts.ready;
});

await page.pdf({
  path: pdfPath,
  format: "Letter",
  printBackground: true,
  margin: {
    top: "0.5in",
    right: "0.5in",
    bottom: "0.5in",
    left: "0.5in"
  }
});

await browser.close();
console.log(`Generated ${path.relative(rootDir, pdfPath)}`);
